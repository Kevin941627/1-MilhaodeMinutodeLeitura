const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.post("/registrar-leitura", async (req, res) => {

    const { usuario_id, minutos } = req.body;

    const hoje = new Date().toISOString().split("T")[0];

    const { data } = await supabase
        .from("leituras")
        .select("*")
        .eq("usuario_id", usuario_id)
        .eq("data_leitura", hoje);

    let totalHoje = 0;

    data.forEach(item => {
        totalHoje += item.minutos;
    });

    if (totalHoje + minutos > 16) {
        return res.status(400).json({
            erro: "Limite de 16 minutos por dia atingido."
        });
    }

    await supabase
        .from("leituras")
        .insert([
            {
                usuario_id,
                minutos,
                data_leitura: hoje
            }
        ]);

    res.json({
        sucesso: true
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando");
});
app.get("/ranking", async (req, res) => {

    const { data } = await supabase.rpc(
        "ranking_turmas"
    );

    res.json(data);

});