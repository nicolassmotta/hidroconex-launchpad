import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { catalogData } from "@/data/catalog";

// Pre-load all product images at build time via Vite's import.meta.glob
// This is the ONLY correct way to reference images inside src/assets
const productImages = import.meta.glob(
  '/src/assets/Products/**/*.png',
  { eager: true, import: 'default' }
) as Record<string, string>;

function resolveImage(importPath: string): string {
  const key = importPath.replace(/^\./, '');
  let url = productImages[key];
  
  if (!url) {
    // Fallback 1: Try Unicode Normalization Form C (often needed for accents like 'ó')
    url = productImages[key.normalize('NFC')];
  }
  if (!url) {
    // Fallback 2: Try Unicode Normalization Form D
    url = productImages[key.normalize('NFD')];
  }
  if (!url) {
    // Fallback 3: Search by filename ignoring path
    const filename = key.split('/').pop();
    if (filename) {
      const foundKey = Object.keys(productImages).find(k => k.endsWith('/' + filename));
      if (foundKey) url = productImages[foundKey];
    }
  }

  return url ?? '';
}


// Helper: pick the first catalog image for a given categoryId as the thumbnail
function getCategoryThumbnail(categoryId: string): string {
  const item = catalogData.find(i => i.categoryId === categoryId);
  return item ? resolveImage(item.importPath) : '';
}

const categories = {
  reservatorios: [
    {
      id: "rm-luvas",
      title: "Luvas de Aço",
      description: "Luvas de aço inox e carbono usinadas em alta precisão para reservatórios metálicos.",
      get image() { return getCategoryThumbnail("rm-luvas"); },
    },
    {
      id: "rm-niples",
      title: "Niples",
      description: "Niples resistentes projetados para suportar pressões exigidas em estruturas de reservação.",
      get image() { return getCategoryThumbnail("rm-niples"); },
    },
  ],
  tanques: [
    {
      id: "ts-juntas",
      title: "Juntas de Fixação",
      description: "Juntas de alto desempenho e vedação segura para tanques de armazenamento subterrâneo.",
      get image() { return getCategoryThumbnail("ts-juntas"); },
    },
    {
      id: "ts-luvas",
      title: "Luvas",
      description: "Luvas robustas em aço carbono projetadas para segurança em sistemas subterrâneos.",
      get image() { return getCategoryThumbnail("ts-luvas"); },
    },
    {
      id: "ts-niples",
      title: "Niples de Redução",
      description: "Diversas medidas em niples de redução e adaptação para interligação de linhas de fluido.",
      get image() { return getCategoryThumbnail("ts-niples"); },
    },
    {
      id: "ts-plugs",
      title: "Plugs de Vedação",
      description: "Plugs usinados para vedação estanque e segura em compartimentos e tubulações.",
      get image() { return getCategoryThumbnail("ts-plugs"); },
    },
    {
      id: "ts-filtros",
      title: "Filtros",
      description: "Sistemas de filtragem duráveis fundamentais para a captação de combustíveis e químicos.",
      get image() { return getCategoryThumbnail("ts-filtros"); },
    },
  ]
};

const ProductCard = ({ product, index, onClick }: { product: { title: string, description: string, image: string }, index: number, onClick: () => void }) => (
  <div
    onClick={onClick}
    className="card-industrial group border border-border shadow-card hover:shadow-card-hover rounded-xl overflow-hidden bg-card flex flex-col h-full cursor-pointer"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="relative h-64 w-full overflow-hidden bg-white flex items-center justify-center p-6 border-b border-border">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300 pointer-events-none" />
      <img
        src={product.image}
        alt={product.title}
        className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500 ease-out"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
        {product.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm flex-grow">
        {product.description}
      </p>

      <div className="mt-4 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm">Ver Catálogo Detalhado</span>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

const Products = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCatolog = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const detailedItems = catalogData.filter(item => item.categoryId === selectedCategoryId);
  const activeCategoryTitle = Object.values(categories)
    .flat()
    .find(c => c.id === selectedCategoryId)?.title || "Catálogo de Produtos";

  return (
    <section id="produtos" className="section-padding bg-muted/30">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 animate-fade-in">
            Nosso Catálogo
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-heading tracking-tight">
            Nossos <span className="text-primary">Produtos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Especialistas na fabricação de peças de alta precisão técnica para as principais aplicações e exigências da indústria atual.
          </p>
        </div>

        {/* Catalog Tabs */}
        <Tabs defaultValue="tanques" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-background border border-border p-1 w-full max-w-[600px] h-[60px] shadow-sm rounded-lg">
              <TabsTrigger
                value="tanques"
                className="w-1/2 h-full text-sm sm:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 rounded-md"
              >
                Tanques Subterrâneos
              </TabsTrigger>
              <TabsTrigger
                value="reservatorios"
                className="w-1/2 h-full text-sm sm:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 rounded-md"
              >
                Reservatórios Metálicos
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tanques" className="mt-0 focus-visible:outline-none focus-visible:ring-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.tanques.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onClick={() => handleOpenCatolog(product.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reservatorios" className="mt-0 focus-visible:outline-none focus-visible:ring-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {categories.reservatorios.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onClick={() => handleOpenCatolog(product.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="text-center mt-16 pt-8 border-t border-border/50">
          <a
            href="#contato"
            className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold px-8 py-4 rounded-lg hover:bg-secondary/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Fale com um Especialista e Solicite Orçamento
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>

      {/* Detailed Catalog Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-background p-0 gap-0 border-border">

          <div className="bg-muted px-6 py-6 border-b border-border sticky top-0 z-20 flex flex-col items-center justify-center text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Catálogo Detalhado
            </span>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground">
              {activeCategoryTitle}
            </DialogTitle>
          </div>

          <div className="p-6 md:p-8">
            {detailedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailedItems.map((item) => (
                  <div key={item.id} className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow group">
                    <div className="h-48 w-full flex items-center justify-center mb-6">
                      <img
                        src={resolveImage(item.importPath)}
                        alt={item.model}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-foreground text-center mb-2">
                      {item.model}
                    </h4>
                    {/* Hidden Description Area for Future Content */}
                    <p className="text-xs text-muted-foreground/50 text-center italic hidden">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                Nenhum produto detalhado cadastrado no momento.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Products;
