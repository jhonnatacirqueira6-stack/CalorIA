// CalorIA main.js - versão otimizada com cache, IA e memória local

(function() {
  // Verifica se o usuário é premium
  window.isPremium = function() {
    return localStorage.getItem("isPremium") === "true";
  };

  // API simulada com fallback inteligente
  window.searchAPI = {
    async getAnalysis(query) {
      try {
        // Cache local rápido
        const cached = localStorage.getItem("analysis_" + query);
        if (cached) return JSON.parse(cached);

        // Requisição para o app principal (Base44)
        const response = await fetch("https://calor-ia-1eab0949.base44.app/api/analyze?query=" + encodeURIComponent(query));

        if (!response.ok) throw new Error("Erro na análise");
        const data = await response.json();

        // Armazena em cache
        localStorage.setItem("analysis_" + query, JSON.stringify(data));
        return data;
      } catch (err) {
        console.error("Erro ao analisar:", err);
        alert("Erro ao analisar. Tente novamente.");
        return null;
      }
    }
  };

  // Garante que dados pesquisados sejam mantidos entre sessões
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("lastVisit", new Date().toISOString());
  });

  console.log("✅ CalorIA main.js carregado com sucesso");
})();
