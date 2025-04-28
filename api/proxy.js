export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST 요청만 허용합니다.' });
  }

  try {
    const { message } = req.body;

    const gasUrl = 'https://script.google.com/macros/s/AKfycbwNhhKhEg2y8oRqXO4idWi0VZnSEnQ6J495JL-8dioh8TAyKpPz-ayBao_ugWbYu1IG/exec'; // 여기에 본인 GAS URL

    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // ✅ 중요한 수정
      body: new URLSearchParams({ message }).toString(), // ✅ 중요한 수정
    });

    const text = await response.text(); // ✅ 텍스트로 읽기
    const data = JSON.parse(text); // ✅ 직접 파싱

    return res.status(200).json({ reply: data.reply });

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: '프록시 서버 오류' });
  }
}
