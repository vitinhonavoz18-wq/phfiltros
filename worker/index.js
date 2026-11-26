/**
 * Worker mínimo da PH Filtros: força HTTPS e entrega os arquivos estáticos.
 * O redirecionamento é feito aqui para não alterar configurações globais
 * da zona conectfly.com.br (que atende outros sites).
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
