# Pastelaria Frontend

Sistema para uma pastelaria, para mostrar sabores disponíveis e informações sobre o estabelecimento.

## Tecnologias

- React 19.2.0
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router 7.9.3
- TanStack Query 5.90.2
- Axios 1.12.2
- Zustand 5.0.8

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── app/              # Configuração da aplicação
├── pages/            # Páginas e layouts
├── domain/           # Domínios de negócio
├── core/             # Componentes e utilitários compartilhados
└── assets/           # Arquivos estáticos
```