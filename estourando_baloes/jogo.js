var timerId = null; 

function iniciaJogo(){
    var url = window.location.search;

    var dificuldade = url.replace('?', '');
    
    var tempo = 0;

    if(dificuldade == 1){
        tempo = 120;
    }

    if(dificuldade == 2){
        tempo = 60;
    }

    if(dificuldade == 3){
        tempo = 30;
    }
    document.getElementById('cronometro').innerHTML = tempo;


    var quantidadeBaloes = 80;
    criaBaloes(quantidadeBaloes);

    document.getElementById('baloesInteiros').innerHTML = quantidadeBaloes;
    document.getElementById('baloesEstourados').innerHTML = 0;

    contagemTempo(tempo + 1);
    
}

function contagemTempo(segundos){
    segundos = segundos - 1;

    if(segundos == -1){
        clearTimeout(timerId);
        gameOver();
        return false;
    }


    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("contagemTempo("+segundos+")",1000);
}

function gameOver(){
    remove_eventos_baloes();
    alert('GAME OVER!\nVocê não conseguiu estourar todos os balões...')
}

function criaBaloes(quantidadeBaloes){
    
    for(var i = 1; i <= quantidadeBaloes; i++){
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.id = 'b'+i;
        balao.style.margin = '10px';
        balao.onclick = function(){estourar(this)}

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){

    var id_Balao = e.id
    document.getElementById(id_Balao).setAttribute('onclick', '');
    document.getElementById(id_Balao).src = 'imagens/balao_azul_pequeno_estourado.png';
    pontuacao(-1);

}

function pontuacao(acao){
    var balaoInteiro = document.getElementById('baloesInteiros').innerHTML;
    var balaoEstourado = document.getElementById('baloesEstourados').innerHTML;

    balaoInteiro = parseInt(balaoInteiro);
    balaoEstourado = parseInt(balaoEstourado);

    balaoInteiro = balaoInteiro + acao;
    balaoEstourado = balaoEstourado - acao;

    document.getElementById('baloesInteiros').innerHTML = balaoInteiro;
    document.getElementById('baloesEstourados').innerHTML = balaoEstourado;

    ganharJogo(balaoInteiro);
}

function ganharJogo(numeroBaloesInteiros){
    if(numeroBaloesInteiros == 0){
        alert('PARABÉNS!\nVocê estourou todos os balões a tempo...');
        pararJogo();
    }
}

function pararJogo(){
    clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

function reiniciaJogo(){
    iniciaJogo().location.reload();
}