import { Factory, Users, Target, TrendingUp } from "lucide-react";

const stats = [
  { icon: Factory, value: "100%", label: "Fabricação Própria" },
  { icon: Users, value: "+500", label: "Clientes Atendidos" },
  { icon: Target, value: "Precisão", label: "Em Cada Peça" },
  { icon: TrendingUp, value: "Qualidade", label: "Comprovada" },
];

const About = () => {
  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Sobre Nós
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Tradição e <span className="text-primary">Inovação</span> na
              Fabricação Industrial
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A <strong className="text-foreground">Hidroconex Indústria e Comércio Ltda</strong> é
                uma fabricante estabelecida na Região de São José do Rio Preto há 14 anos,
                especializada na produção de componentes industriais.
              </p>
              <p>
                Com uma equipe técnica qualificada e equipamentos modernos,
                desenvolvemos soluções que atendem às mais rigorosas especificações
                do mercado industrial. Nossa missão é fornecer produtos que garantam
                a segurança e eficiência das operações de nossos clientes.
              </p>
              <p>
                Cada peça fabricada pela Hidroconex passa por controle de qualidade,
                assegurando que nossos clientes recebam produtos com a
                durabilidade e performance que o setor industrial exige.
              </p>
            </div>

            {/* Features List */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">Aço Carbono</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">Aço Inox</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">Sob Medida</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">Entrega Rápida</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
