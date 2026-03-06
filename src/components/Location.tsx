const Location = () => {
  return (
    <section id="localizacao" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Onde Estamos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossa <span className="text-primary">Localização</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visite nossa fábrica em São José do Rio Preto. Estamos localizados
            no Distrito Industrial Campo Verdi, com fácil acesso.
          </p>
        </div>

        {/* Map Container */}
        <div className="rounded-xl overflow-hidden shadow-xl border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.2835897619847!2d-49.40247182375747!3d-20.81611118073837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bdad38cb7baa97%3A0x9c77f7f4fcae3e8e!2sR.%20Monteiro%20Lobato%2C%20750%20-%20Distrito%20Industrial%2C%20S%C3%A3o%20Jos%C3%A9%20do%20Rio%20Preto%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1706000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Hidroconex"
            className="w-full"
          />
        </div>

        {/* Address Summary */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>R. Monteiro Lobato, 750 - Distrito Ind. Campo Verdi</span>
          </div>
          <span className="hidden sm:block text-border">|</span>
          <span className="text-primary font-medium">São José do Rio Preto - SP</span>
        </div>
      </div>
    </section>
  );
};

export default Location;
