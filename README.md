# CNB (Cadastro Nacional de Bicicletas)

### A proposta do CNB é fornecer uma plataforma de registro e autenticação de propriedade de bicicletas, garantindo segurança, confiabilidade e praticidade para os proprietários de bicicletas. A ideia principal é faciltiar a identificação da bicicleta, comprovar sua propriedade e auxiliar na prevenção contra roubos e fraudes, reunindo todas as informações em um único ambiente acessível e seguro.

![CNB](./public/git_capa.png)

## Funcionalidades

1. Registro
   - O registro de usuário tem dados criptografados garantindo a LGPD.
   - Para efetuar o registro da bicicleta no CNB, o número de série dela deve informado e único no sistema. O número de série é de uso exclusivo para identificar a bicicleta dentro do sistema.

2. Edição
   - O sitema permite a edição parcial de registros, os campos que não são permitidos a edição por segurança são: número de série, marca e categoria da bicicleta.

3. Exclusão
   - Para garantir a rastreabilidade do sistema a bicicleta não é excluída permanentemente, é feito um soft delete tornando ela inativa.
   - Caso o usuário opte por excluir a sua conta os dados são anonimizados, garantindo a lei LGPD.

4. Transferir propriedade
   - Para iniciar uma transferência o usuário deve informar primeiramente o CPF do receptor da bicicleta, o sistema busca o usuário e exibe os dados para confirmação do proprietário atual. Após isso, uma notificação é enviada para o receptor, que pode aceitar ou recusar a solicitação. Em ambos o proprietário atual recebe uma nova notificação para aceitar ou recusar a transferência, garantindo que o controle permaneça sob o dominio do dono atual da bicicleta.

5. Autenticação de propriedade
   - Aqui é onde parte da mágica do sistema acontece, quando o usuário autentica a propriedade o sistema gera um QrCode que possui gravado a url de uma rota de autenticidade de propriedade onde informa o dono atual da bicicleta e a data de autenticação, além de outros dados.

6. Notificar roubo.
   - A funcionalidade de notificar um roubo a principio, bloqueia e cancela todas as transações ativas no momento em que a bicicleta é alterada para roubada. Além de gerar um registro na tabela de Roubo gerando dados e estatísticas que serão utilizadas em funcionalidades futuras.

7. Marcar como encontrada.
   - A principal ideia de marcar como encontrada a bicicleta é habilitar novamente a edição e permitir transações de propriedade, além de gerar estatísticas, por exemplo de quantas bicicletas roubadas em certas regiões foram recuperadas, em quanto tempo elas foram recuperadas.

8. Notificações
   - O sistema gera notificações para os usuários, que serão dividas em três categorias, são elas: Amizades, Transações, Social. Essa divisão garante mais controle e organização para o usuário, permitindo uma leitura mais ágil e uma decisão facilitada.

## Tecnologias

### Frontend

- Angular
- Ionic
- TypeScrpit
- SCSS

### Backend

- Java
- Spring Boot
- Maven

### Banco de dados

- PostgreSQL

## Como rodar o projeto?

### Frontend - Angular/Ionic

- Clone ou copie o projeto para uma pasta de sua preferência.
- Abra o pasta do projeto no VS code.
- Acesse o terminal na raiz do projeto.
- Instale as dependências utilizando: 'npm install'
- Após a instalação execute o projeto com: 'ionic serve'

## Backend - Java/Spring Boot

- Certifique-se de possuir o Java e o Maven instalados na máquina.
- Abra a pasta do backend na sua IDE de preferência.
- Acesse o terminal na raiz do projeto
- Instale as dependências e execute a aplicação com o comando: 'mvn spring-boot:run'
- Aguarde a inicialização do servidor.

## Banco de dados - PostgreSQL

- Certifique-se de possuir o PostgreSQL instalado na máquina
- Crie um banco de dados com o nome cnb_db
- Configure as credenciais de acesso no arquivo application.properties
- Verifique se o serviço do PostgreSQL está em execução
- Após a configuração, inicie o backend para que a aplicação consiga se conectar ao banco de dados normalmente.

## Equipe de desenvolvimento

[Alleson Figueredo Sales](https://github.com/allesonsales)
[Beatriz Santos Silva](https://github.com/allesonsales)
[Gabriel Figueredo](https://github.com/Darksungab)

## Licença
