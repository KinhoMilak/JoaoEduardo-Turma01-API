import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';

describe('Mercado', () => {
    const p = pactum;
    const baseUrl = 'https://api-desafio-qa.onrender.com/docs/#';
    p.request.setDefaultTimeout(30000);

    let mercadoId = 1;
    let frutaId = 2;
    let docesId = 3;
    let frutaIdNo = "Due";
    let mercadoIdNo = "Uno";

    it('Retornar os Mercados', async () => {
        const result = await p
            .spec()
            .get(`${baseUrl}/mercado`)
            .expectStatus(StatusCodes.OK)// 200
    });

    it('Adiciona Mercado', async() =>{
        const response = await p
        .spec().post(`${baseUrl}/mercado`).withJson({
            "nome": "Ademir",
            "cnpj": "53277139000143",
            "endereco": "Estrada Geral"
          }).expectStatus(StatusCodes.OK); //200
    });

    it('Busca um mercado por ID', async () => {
        const result = await p
            .spec()
            .get(`${baseUrl}/mercado/${mercadoId}`)
            .expectStatus(StatusCodes.OK) //200
    });

    it('Atualiza um mercado existente', async () => {
        const result = await pactum
            .spec()
            .put(`${baseUrl}/mercado/${mercadoId}`)
            .withJson({
                "nome": "Ademiro",
                "cnpj": "53277139000143",
                "endereco": "Estrada de Barro"
              })
    })

    it('Remove um mercado Existente', async () => {
        await p
            .spec()
            .delete(`${baseUrl}/mercado/${mercadoId}`)
            .expectStatus(StatusCodes.OK) // 200
    });

    it('Adiciona uma fruta', async() =>{
        const response = await p
        .spec().post(`${baseUrl}/mercado/${mercadoId}/produtos/hortifruit/legumes`)
        .withJson({
            "nome": "Maçã",
            "valor": 3
          }).expectStatus(StatusCodes.OK); //200
    });

    it('Remove uma Fruta', async () => {
        await p
            .spec()
            .delete(`${baseUrl}/mercado/${mercadoId}/produtos/hortifruit/legumes/${frutaId}`)
            .expectStatus(StatusCodes.OK) //200
    });

    it('Adiciona um Doce', async() =>{
        const response = await p
        .spec().post(`${baseUrl}/mercado/${mercadoId}/produtos/padaria/doces`)
        .withJson({
            "nome": "Romeu and Juliet",
            "valor": 5
          }).expectStatus(StatusCodes.OK);//200
    });

    it('Deleta um doce', async () => {
        await p
            .spec()
            .delete(`${baseUrl}/mercado/${mercadoId}/produtos/padaria/doces/${docesId}`)
            .expectStatus(StatusCodes.OK) //200
    });

    it('Retorna lista de Doces', async () => {
        const result = await p
            .spec()
            .get(`${baseUrl}/mercado/${mercadoId}/produtos/padaria/doces`)
            .expectStatus(StatusCodes.OK) //200
    });

    it('Recupera os Porcos no açougue', async () => {
        const result = await p
            .spec()
            .get(`${baseUrl}/mercado/${mercadoId}/produtos/acougue/suinos`)
            .expectStatus(StatusCodes.OK) //200
    });


    it('Erro de fruta para deletar nao existe ou mercado não existe', async () => {
        await p
            .spec()
            .delete(`${baseUrl}/mercado/${mercadoIdNo}/produtos/hortifruit/legumes/${frutaIdNo}`)
            .expectStatus(StatusCodes.NOT_FOUND) //404
    });

    it('Adiciona um Porco', async() =>{
        const response = await p
        .spec().post(`${baseUrl}/mercado/${mercadoId}/produtos/acougue/suinos`)
        .withJson({
            "nome": "Porco marron",
            "valor": 500
          }).expectStatus(StatusCodes.OK);//200
    });


    it('Adiciona um Porco com valor invalido', async() =>{
        const response = await p
        .spec().post(`${baseUrl}/mercado/${mercadoId}/produtos/acougue/suinos`)
        .withJson({
            "nome": "Porco marron",
            "gordura": "&**GDE",
          }).expectStatus(StatusCodes.BAD_REQUEST);//400
    });

    it('Retorna lista de Temperrus', async () => {
        const result = await p
            .spec()
            .get(`${baseUrl}/mercado/${mercadoId}/produtos/mercearia/temperosCondimentos`)
            .expectStatus(StatusCodes.OK) //200
    });

    it('Lista de Bebidas sem Alcool(e sem graça)', async () => {
        const result = await p
            .spec()
            .get(`${baseUrl}/mercado/${mercadoId}/produtos/bebidas/semAlcool`)
            .expectStatus(StatusCodes.OK) //200
    });



});