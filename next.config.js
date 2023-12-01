// next.config.js
module.exports = {
  // Defina a extensão dos arquivos de página
  pageExtensions: ["tsx", "ts", "jsx", "js"],

  // Indique o diretório raiz para as páginas
  // Neste caso, 'src' é o diretório principal e 'routes' é o diretório das páginas
  webpack: (config, { defaultLoaders }) => {
    config.resolve.modules.push(__dirname);
    return config;
  },
};
