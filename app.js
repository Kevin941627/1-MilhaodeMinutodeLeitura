async function registrar() {

    const minutos =
        parseInt(
            document.getElementById("minutos").value
        );

    if (minutos > 16) {

        alert("Máximo permitido: 16 minutos.");

        return;
    }

    const resposta = await fetch(
        "http://localhost:3000/registrar-leitura",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario_id: "123",
                minutos
            })
        }
    );

    const dados = await resposta.json();

    if (dados.erro) {

        document.getElementById("mensagem").innerText =
            dados.erro;

    } else {

        document.getElementById("mensagem").innerText =
            "Leitura registrada com sucesso!";
    }
}
async function carregarContador() {

    const resposta =
        await fetch(
            "http://localhost:3000/contador-geral"
        );

    const dados =
        await resposta.json();

    document.getElementById("contador")
        .innerText =
        `${dados.total} / 1.000.000`;
}

carregarContador();

setInterval(carregarContador, 5000);
app.get("/contador-geral", async (req, res) => {

     const { data } = await supabase
        .from("leituras")
        .select("minutos");

    let total = 0;

    data.forEach(item => {
        total += item.minutos;
    });

    res.json({
        total
    });

});

async function carregarContador() {

    const resposta =
        await fetch(
            "http://localhost:3000/contador-geral"
        );

    const dados =
        await resposta.json();

    document.getElementById("contador")
        .innerText =
        `${dados.total} / 1.000.000`;
}

carregarContador();

setInterval(carregarContador, 5000);'´['