// Importar funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAqZBVNO_jIjah9v-Tp_Axy1LoMLkaINPU",
    authDomain: "device-streaming-9e3b934a.firebaseapp.com",
    projectId: "device-streaming-9e3b934a",
    storageBucket: "device-streaming-9e3b934a.appspot.com",
    messagingSenderId: "608328398854",
    appId: "1:608328398854:web:706cf69b6dcb751930ab87"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para carregar inscrições
async function carregarInscricoes() {
    const tbody = document.querySelector("#inscricoes-list tbody"); // Seleciona o <tbody> dentro da tabela
    tbody.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

    const alunosSnapshot = await getDocs(collection(db, "alunos"));
    const inscricoes = [];

    alunosSnapshot.forEach(doc => {
        const aluno = doc.data();
        if (aluno.inscrito) {
            inscricoes.push({
                eletiva: aluno.eletiva,
                turma: aluno.turma,
                nomeAluno: aluno.nomeAluno
            });
        }
    });

    // Ordenar por eletiva para melhor visualização
    inscricoes.sort((a, b) => a.eletiva.localeCompare(b.eletiva));

    // Adicionar dados à tabela
    inscricoes.forEach(inscricao => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${inscricao.eletiva}</td>
            <td>${inscricao.turma}</td>
            <td>${inscricao.nomeAluno}</td>
        `;
        tbody.appendChild(row);
    });
}

// Adicionar evento ao botão para atualizar inscrições
document.getElementById("atualizar-btn").addEventListener("click", carregarInscricoes);

// Carregar as inscrições ao iniciar
document.addEventListener("DOMContentLoaded", carregarInscricoes);
