# Clínica Contatos

Landing page para uma clínica de estética e harmonização facial em João Pessoa - PB, feita com HTML, CSS e JavaScript puros.

> **Projeto fictício.** O nome da clínica, o telefone, o endereço, o Instagram e as avaliações são inventados e servem apenas para portfólio e estudo. As imagens vêm de bancos de fotos (Unsplash e Pinterest) e são usadas só como ilustração.

## Funcionalidades

- **Navbar fixa** que muda de aparência ao rolar a página, com menu hambúrguer no mobile
- **Hero** com chamada principal e botões de agendamento
- **Faixa de confiança** com nota no Google, tempo de experiência e diferenciais
- **Seção "Quem Somos"** e cards dos tratamentos mais procurados
- **Catálogo de procedimentos em abas** (Lasers e Tecnologias, Harmonização Facial e Preenchimento), cada item com botão que abre o WhatsApp já com a mensagem pronta
- **Carrossel de infraestrutura** com autoplay, setas e indicadores, que pausa ao passar o mouse ou focar com o teclado
- **Depoimentos** no estilo avaliações do Google
- **FAQ em accordion**
- **Formulário de contato** que envia os dados direto para o WhatsApp, com campo extra para "Outros Procedimentos"
- **Animações de entrada** ao rolar a página (reveal)
- **Botão flutuante** do WhatsApp
- **Mapa** do Google embutido no rodapé

## Acessibilidade

- Contorno de foco visível para navegação por teclado
- Estados `aria-expanded` no FAQ e no menu mobile, e `aria-selected` nas abas do catálogo
- Indicadores do carrossel como botões com `aria-label`
- Respeito a `prefers-reduced-motion` (sem autoplay nem animações para quem desativou no sistema)

## Tecnologias

- HTML5
- CSS3 (variáveis, Flexbox, Grid e media queries)
- JavaScript (ES6+), sem frameworks
- [Font Awesome 6.4](https://fontawesome.com/) para ícones
- [Google Fonts](https://fonts.google.com/): Cormorant Garamond e Manrope
- [Claude](https://claude.ai/) (Anthropic) e [Gemini](https://gemini.google.com/) (Google) como assistentes de IA no desenvolvimento

## Estrutura

```
.
├── index.html   # estrutura e conteúdo da página
├── style.css    # estilos, paleta e responsividade
├── script.js    # interações (menu, carrossel, abas, FAQ, formulário)
└── README.md
```

## Como rodar

Não precisa instalar nada. Clone o repositório e abra o `index.html` no navegador:

```bash
git clone https://github.com/Luizgarcg/NOME-DO-REPOSITORIO.git
cd NOME-DO-REPOSITORIO
```

Se preferir, use a extensão **Live Server** do VS Code.

## Como personalizar

- **Número do WhatsApp:** troque `5583900000000` no `script.js` (formulário e catálogo) e nos links `wa.me` do `index.html`.
- **Cores e fontes:** edite as variáveis no começo do `style.css` (`:root`).
- **Procedimentos do catálogo:** cada item é um bloco `.catalog-item` dentro do painel da sua categoria no `index.html`. O atributo `data-item` define o nome que vai na mensagem do WhatsApp.

## Autor

Feito por [Luis](https://github.com/Luizgarcg), estudante de Análise e Desenvolvimento de Sistemas.
