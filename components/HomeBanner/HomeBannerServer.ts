
import HomePageRepository from "@/core/HomePageRepository";
import HomePageCollection from "@/core/HomePage";

const BannerHome = async (lng: string) => {
    // Server Components não suportam estados ou efeitos do lado do cliente.
    // Você deve buscar dados aqui ou usar getServerSideProps/getStaticProps fora do componente para dados iniciais.

    // Substitua a lógica específica do cliente por dados renderizados do servidor ou por componentes estáticos.
    // Aqui vamos manter simples e apenas mostrar um esqueleto ou uma mensagem, já que a lógica específica de tamanho e estado do dispositivo foi removida.
    
    // Use um método de fetch adequado ao seu ambiente, exemplo fictício:
    const repo: HomePageRepository = new HomePageCollection();
    return await repo.getBanner(lng).then((result) => {
        if (result instanceof Error) {
            return 'Error';
            //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
        } else {
            return result
        }
    });
   
    

    
};

export default BannerHome;
