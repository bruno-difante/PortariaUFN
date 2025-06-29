# 🏫 Portaria UFN

Sistema de controle de empréstimos e localização de professores para a portaria da Universidade Franciscana (UFN).

## 🎯 Objetivo

O projeto tem como objetivo facilitar a rotina do porteiro da faculdade, permitindo:

- Registro e controle de **itens emprestados** (chaves, controles, cabos, etc)
- Identificação de **professores via crachá (RFID)**
- Indicação do **prédio e sala** em que o professor estará, mesmo sem pegar itens
- Centralização dos dados via um sistema web (back-end em Java + front-end em React)

---

## 🛠️ Tecnologias Utilizadas

| Camada         | Tecnologia                         |
|----------------|-------------------------------------|
| Front-end      | React (com JavaScript e CSS)        |
| Back-end       | Java + Spring Boot                  |
| Banco de Dados | MongoDB Atlas (nuvem)               |
| Controle de Versão | Git + GitHub                   |

---

## ✅ Funcionalidades

- [x] Cadastro de **Funcionários** com identificação por RFID
- [x] Cadastro de **Itens** para empréstimo (ex: chave, controle, etc.)
- [x] Cadastro de **Localização** (Prédio + Sala) de onde o item estará
- [x] API REST funcional com testes via **Postman**
- [x] MongoDB conectado com sucesso
- [x] Repositório Git organizado com branch `main` limpa
- [x] Front-end criado (pasta `frontend/`)
- [x] Deploy do projeto (back e front)
- [x] Fazer Visualização estoque
- [x] Fazer Visualização de funcionarios
- [x] Criação de itens e funcionarios
- [x] Sistema de Emprestimo completo
- [x] Atualização das listas
---
## Lista de Diagramas

A seguir, uma descrição de cada diagrama disponível.

### 1. Modelo de Domínio (`Modelo de Domínio.png`)
- **Tipo:** Diagrama de Classes
- **Descrição:** Representa as principais entidades de negócio do sistema (`Usuario`, `Item`, `Emprestimo`, etc.) e os relacionamentos entre elas. Serve como a base para a estrutura de dados e a lógica de negócio.

### 2. Camada de Persistência (`Camada de Presenca.png`)
- **Tipo:** Diagrama de Classes
- **Descrição:** Detalha como as entidades de domínio são mapeadas para a camada de persistência de dados, mostrando os repositórios responsáveis por interagir com o banco de dados.

### 3. API (Controller) (`API.png`)
- **Tipo:** Diagrama de Classes
- **Descrição:** Mostra os endpoints da API REST, detalhando os métodos disponíveis nos controladores (`UsuarioController`, `ItemController`, `EmprestimoController`) e como eles se conectam aos repositórios.

### 4. Banco de Dados (`Banco de Dados.png`)
- **Tipo:** Diagrama de Entidade-Relacionamento (ERD)
- **Descrição:** Descreve a estrutura do banco de dados MongoDB, mostrando as coleções (tabelas) e as chaves estrangeiras que definem os relacionamentos entre os dados.

### 5. Caso de Uso (`Diagrama de Caso de Uso.png`)
- **Tipo:** Diagrama de Caso de Uso
- **Descrição:** Oferece uma visão de alto nível das funcionalidades do sistema (`Gerenciar Usuários`, `Registrar Emprestimo`, etc.) e identifica o ator principal (`Porteiro`) que interage com elas.

### 6. Fluxos de Interação (Diagramas de Sequência)
- **Descrição:** Um conjunto de diagramas que detalha o passo a passo das principais operações do sistema.
  - **Cadastro de Usuário (`Cadastro Usuario.png`):** Mostra o fluxo para registrar um novo usuário.
  - **Cadastro de Item (`Cadastro Item.png`):** Detalha o processo de adição de um novo item ao estoque.
  - **Registro de Empréstimo (`Registro de Emprestimo.png`):** Ilustra a sequência para emprestar um ou mais itens a um usuário.
  - **Devolução de Empréstimo (`Devolução.png`):** Mostra o fluxo para registrar a devolução de itens, atualizando o estoque.
  - **Gerenciamento de Usuário (`Gerenciamento de Usuário.png`):** Cobre os fluxos de alteração e exclusão de usuários.
  - **Gerenciamento de Itens (`Gerenciamento de Itens.png`):** Detalha a alteração e exclusão de itens.
  - **Registro de Presença (`Registro de Presenca.png`):** Mostra como a localização de um professor é registrada.


## 👨‍💻 Desenvolvedores

**Nome:** Iago Vargas  
**Nome:** Bruno Difante
**Nome:** Gabriel Maier Teixeira
**Nome:** Vicenzo de Souza
**Curso:** Ciência da Computação - Universidade Franciscana (UFN)  
**Semestre:** 5º  
**GitHub:** [@Iago-Vargas](https://github.com/Iago-Vargas)

---

## 📌 Licença

Este projeto foi desenvolvido para fins acadêmicos e educacionais.  
Sinta-se à vontade para utilizar como referência, mas cite a fonte.


