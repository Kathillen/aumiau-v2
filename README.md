# Aumiau - Frontend

## Sobre o projeto

O Aumiau é uma plataforma web desenvolvida para facilitar o agendamento de serviços para pets. O sistema permite que os usuários selecionem o porte do animal, consultem os preços dos serviços disponíveis, realizem agendamentos e acompanhem as informações dos atendimentos.

O frontend é responsável pela interface visual e pela interação entre o usuário e o sistema.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Supabase

## Funcionalidades

- Seleção do porte do pet.
- Consulta de preços e duração dos serviços.
- Seleção de serviços, como banho, tosa, hidratação e transporte.
- Cadastro de informações do pet.
- Escolha da data do atendimento.
- Resumo do agendamento.
- Simulação de pagamento via PIX.
- Histórico de agendamentos do usuário.
- Integração com o backend.
- Autenticação de usuários utilizando Supabase.

## Estrutura do projeto

```text
src/
├── assets/
│   └── imagens e recursos visuais
├── components/
│   └── componentes reutilizáveis
├── lib/
│   └── configuração do Supabase
├── pages/
│   ├── Home/
│   ├── Login/
│   └── Pagamentos/
├── services/
│   ├── api.ts
│   ├── appointmentsService.ts
│   └── paymentsService.ts
└── App.tsx
```

## Instalação e execução

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Acessar a pasta do projeto

```bash
cd aumiau-version-2
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Criar um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=URL_DO_SUPABASE
VITE_SUPABASE_ANON_KEY=CHAVE_PUBLICA_DO_SUPABASE
VITE_API_URL=https://aumiau-backend-production.up.railway.app
```

### 5. Executar o projeto

```bash
npm run dev
```

O frontend estará disponível em:

```text
http://localhost:5173
```

## Integração com o backend

O frontend realiza requisições HTTP para a API desenvolvida em FastAPI, utilizando a URL configurada na variável `VITE_API_URL`.

A autenticação das requisições é realizada por meio do token de acesso fornecido pelo Supabase.

## Hospedagem

O frontend está hospedado na Vercel.

## Observações

O pagamento via PIX possui caráter de simulação. Nenhuma cobrança financeira real é realizada pelo sistema.


DOCUMENTAÇÃO:
https://docs.google.com/document/d/1gV6M4zQLlUmGyjDaYO2miUuS-Rh_RcQBVn5p3bW9La0/edit?usp=sharing

