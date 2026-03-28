import OpenAI from 'openai';
import { env } from '../config/env.js';

const SYSTEM_PROMPT = `You are Kisan Setu, an agricultural advisory assistant for small and marginal farmers in India, especially Uttar Pradesh (e.g. Siddharthnagar, Balrampur). 
Give practical, concise advice in simple language. Prefer organic/low-input options where relevant, water conservation, soil health, and climate resilience.
If unsure, suggest consulting local KVK or agriculture department. Respond in the same language as the farmer's question when it is Hindi or English; otherwise use Hindi mixed with simple English terms where needed.`;

function ruleBasedAdvice(question, context) {
  const q = (question || '').toLowerCase();
  const crop = (context?.crop || '').toLowerCase();
  const district = context?.district || '';

  const blocks = [];

  if (/बारिश|rain|पानी|सूखा|drought|irrigation|सिंचाई/i.test(question)) {
    blocks.push(
      'अनियमित बारिश के लिए: मिट्टी में जलधारण बढ़ाने हेतु खेत में जैविक खाद व मल्चिंग पर विचार करें। सिंचाई के समय पानी की बचत के लिए ड्रिप या स्प्रिंकलर उपयोगी हो सकता है।'
    );
  }
  if (/मिट्टी|soil|urine|जैविक|organic|खाद|fertilizer|npk/i.test(question)) {
    blocks.push(
      'मिट्टी स्वास्थ्य: नियमित रूप से मिट्टी परीक्षण करवाएं। जैविक खाद, हरी खाद और फसल चक्र अपनाने से उर्वरता बनी रहती है। अत्यधिक रासायनिक खाद से बचें।'
    );
  }
  if (/बीज|seed|variety|किस्म/i.test(question)) {
    blocks.push(
      'बीज: प्रमाणित बीज उपयोग करें; स्थानीय मौसम व जल उपलब्धता अनुकूल किस्म चुनें। बुवाई से पहले उपचार (जैविक/रासायनिक) KVK की सलाह से करें।'
    );
  }
  if (/तापमान|temperature|climate|मौसम|heat/i.test(question)) {
    blocks.push(
      'जलवायु: अत्यधिक गर्मी में सुबह-शाम सिंचाई, छाया-सहिष्णु या अल्प जल वाली किस्में, और मिट्टी ढकाव (मल्च) लाभदायक हो सकते हैं।'
    );
  }

  if (crop) {
    blocks.push(`संदर्भ फसल "${context.crop}": स्थानीय बुवाई का समय, कीट-रोग निगरानी, और संतुलित पोषण योजना KVK/कृषि विभाग की सूची के अनुसार अपनाएं।`);
  }
  if (district) {
    blocks.push(`जिला ${district}: जिला कृषि अधिकारी व कृषि विज्ञान केंद्र (KVK) से नवीनतम योजना व मौसम चेतावनी जानकारी लें।`);
  }

  if (blocks.length === 0) {
    blocks.push(
      'आपके प्रश्न के लिए: फसल का नाम, बुवाई का समय, सिंचाई की स्थिति और मिट्टी का प्रकार बताने से अधिक सटीक सलाह दी जा सकती है। छोटे किसानों के लिए लागत कम करने हेतु फसल चक्र, जैविक खाद व जल संरक्षण पर ध्यान दें।'
    );
  }

  return blocks.join('\n\n');
}

export async function generateAdvisory(question, context, profileSummary) {
  const ctxLine = profileSummary ? `\nFarmer context: ${profileSummary}` : '';

  if (env.openaiApiKey) {
    const client = new OpenAI({ apiKey: env.openaiApiKey });
    const userContent = `Question: ${question}\nExtra context (JSON): ${JSON.stringify(context || {})}${ctxLine}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent },
      ],
      max_tokens: 800,
      temperature: 0.4,
    });

    const text = completion.choices[0]?.message?.content?.trim();
    if (text) {
      return { response: text, source: 'openai' };
    }
  }

  const rules = ruleBasedAdvice(question, context);
  return { response: rules, source: 'rules' };
}
