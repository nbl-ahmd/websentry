export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log("hi");
        
        const { url } = req.body;
      
        console.log("url");
        console.log(url);


        const response = await fetch('https://upgraded-couscous-gpg7466q4w6f55w-8000.app.github.dev/check-url', {  // Ensure FastAPI is running
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();
        res.status(200).json(data);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
