import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST 요청만 허용합니다.' });
  }

  try {
    const { message } = req.body;

   const gasUrl = 'https://script.google.com/macros/s/AKfycbwNhhKhEg2y8oRqXO4idWi0VZnSEnQ6J495JL-8dioh8TAyKpPz-ayBao_ugWbYu1IG/exec'; // 여기에 본인 GAS URL

    const params = new URLSearchParams();
    params.append('message', message);

    const response = await axios.post(gasUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return res.status(200).json({ reply: response.data.reply });

  } catch (error) {
    console.error('Proxy error:', error.response?.data || error.message);
    return res.status(500).json({ error: '프록시 서버 오류' });
  }
}
