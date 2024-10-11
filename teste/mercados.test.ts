import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';

describe('Mercado', () => {
    const p = pactum;
    const baseUrl = 'https://api-desafio-qa.onrender.com';
    p.request.setDefaultTimeout(30000);

    let idMercado = "";
    let idProduto = "";

    it('Criar um mercado', async () => {
        const response = await p
            .spec()
            .post(`${baseUrl}/mercado/`)
            .withJson({
                "name": "Mercado Teste",
                "location": "Criciúma",
                "owner": "Joao"
            }).expectStatus(StatusCodes.CREATED);
        idMercado = response.body.id;
    });

    it('Não permite criar um mercado sem nome', async () => {
        await p
            .spec()
            .post(`${baseUrl}/mercado/`)
            .withJson({
                "location": "Criciúma",
                "owner": "Arthur"
            }).expectStatus(StatusCodes.BAD_REQUEST);
    });

    it('Listar um mercado pelo Id', async () => {
        await p
            .spec()
            .get(`${baseUrl}/mercado/${idMercado}/`)
            .expectStatus(StatusCodes.OK);
    });

    it('Criar um produto no mercado', async () => {
        const produto = await p
            .spec()
            .post(`${baseUrl}/mercado/${idMercado}/produtos/`)
            .withJson({
                "productName": "Arroz",
                "productDescription": "Arroz Branco",
                "price": 20.00
            }).expectStatus(StatusCodes.CREATED);
        idProduto = produto.body.id;
    });

    it('Atualizar um produto do mercado', async () => {
        await p
            .spec()
            .put(`${baseUrl}/mercado/${idMercado}/produtos/${idProduto}`)
            .withJson({
                "productName": "Arroz Integral",
                "productDescription": "Arroz Integral",
                "price": 25.00
            }).expectStatus(StatusCodes.OK);
    });

    it('Deve listar um produto pelo ID', async () => {
        await p
            .spec()
            .get(`${baseUrl}/mercado/${idMercado}/produtos/${idProduto}`)
            .expectStatus(StatusCodes.OK);
    });

    it('Deletar um produto pelo Id', async () => {
        await p
            .spec()
            .delete(`${baseUrl}/mercado/${idMercado}/produtos/${idProduto}`)
            .expectStatus(StatusCodes.OK);
    });

    it('Deletar um mercado pelo Id', async () => {
        await p
            .spec()
            .delete(`${baseUrl}/mercado/${idMercado}/`)
            .expectStatus(StatusCodes.OK);
    });
});
