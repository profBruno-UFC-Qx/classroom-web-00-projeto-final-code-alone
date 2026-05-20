import axios from 'axios';

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    const isbnRaw = data.isbn || data.ISBN;

    if (!isbnRaw) return;
    const isbnLimpo = isbnRaw.replace(/[-\s]/g, '');

    console.log(`====== [LIFECYCLE LIVRO] Iniciando busca para ISBN: ${isbnLimpo} ======`);

    // Tentativa 1: Google Books
    try {
      console.log('[LIFECYCLE] Tentando Google Books API...');
      const urlGoogle = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnLimpo}`;
      const respostaGoogle = await axios.get(urlGoogle);

      if (respostaGoogle.data && respostaGoogle.data.totalItems > 0) {
        const infoLivro = respostaGoogle.data.items[0].volumeInfo;
        
        // Se houver array de autores, junta em uma String separada por vírgula
        const autoresString = infoLivro.authors && infoLivro.authors.length > 0 
          ? infoLivro.authors.join(', ') 
          : 'Autor Desconhecido';
        
        data.Titulo = data.Titulo || infoLivro.title;
        data.titulo = data.titulo || infoLivro.title;
        
        data.Autor = data.Autor || autoresString;
        data.autor = data.autor || autoresString;
        data.Autores = data.Autores || autoresString;
        data.autores = data.autores || autoresString;
        
        data.Editora = data.Editora || infoLivro.publisher || 'Editora Não Informada';
        data.editora = data.editora || infoLivro.publisher || 'Editora Não Informada';
        
        if (infoLivro.publishedDate && !data.Ano_de_publicacao && !data.ano_de_publicacao) {
          const ano = new Date(infoLivro.publishedDate).getFullYear();
          const anoValido = ano <= new Date().getFullYear() ? ano : new Date().getFullYear();
          data.Ano_de_publicacao = anoValido;
          data.ano_de_publicacao = anoValido;
        }
        if (infoLivro.imageLinks && infoLivro.imageLinks.thumbnail) {
          const urlTratada = infoLivro.imageLinks.thumbnail.replace('http://', 'https://');
          data.Capa_URL = urlTratada;
          data.capa_url = urlTratada;
        }
        console.log(`[LIFECYCLE] Sucesso via Google Books: "${infoLivro.title}"`);
        return; 
      }
    } catch (error: any) {
      console.warn(`[LIFECYCLE WARNING] Google Books indisponível. Redirecionando...`);
    }

    // Tentativa 2: Fallback para a Open Library API
    try {
      console.log('[LIFECYCLE] Tentando Open Library API...');
      const urlOpenLibrary = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbnLimpo}&format=json&jscmd=data`;
      const respostaOL = await axios.get(urlOpenLibrary);
      const chaveLivro = `ISBN:${isbnLimpo}`;

      if (respostaOL.data && respostaOL.data[chaveLivro]) {
        const infoOL = respostaOL.data[chaveLivro];
        
        // Mapeia os nomes do objeto da Open Library e junta em String
        const autoresString = infoOL.authors && infoOL.authors.length > 0
          ? infoOL.authors.map((a: any) => a.name).join(', ')
          : 'Autor Desconhecido';

        data.Titulo = data.Titulo || infoOL.title;
        data.titulo = data.titulo || infoOL.title;
        
        data.Autor = data.Autor || autoresString;
        data.autor = data.autor || autoresString;
        data.Autores = data.Autores || autoresString;
        data.autores = data.autores || autoresString;
        
        data.Editora = data.Editora || (infoOL.publishers ? infoOL.publishers.map((p: any) => p.name).join(', ') : 'Editora Não Informada');
        data.editora = data.editora || (infoOL.publishers ? infoOL.publishers.map((p: any) => p.name).join(', ') : 'Editora Não Informada');
        
        if (infoOL.publish_date && !data.Ano_de_publicacao && !data.ano_de_publicacao) {
          const ano = parseInt(infoOL.publish_date.match(/\d{4}/)?.[0] || '');
          if (!isNaN(ano)) {
            data.Ano_de_publicacao = ano;
            data.ano_de_publicacao = ano;
          }
        }
        if (infoOL.cover && infoOL.cover.medium) {
          data.Capa_URL = infoOL.cover.medium;
          data.capa_url = infoOL.cover.medium;
        }
        console.log(`[LIFECYCLE] Sucesso via Open Library: "${infoOL.title}"`);
      } else {
        console.log('[LIFECYCLE] ISBN não localizado nas APIs externas.');
      }
    } catch (error: any) {
      console.error('[LIFECYCLE ERROR] Falha total nas APIs externas:', error.message);
    }
  }
};