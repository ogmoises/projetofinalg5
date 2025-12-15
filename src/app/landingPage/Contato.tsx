"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { useState } from "react";

export default function ContatoSection() {
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nome: "", email: "", mensagem: "" });
    }, 3000);
  };

  const socialLinks = [
    { icon: <FaDiscord />, label: "Discord", link: "#" },
    { icon: <FaGithub />, label: "GitHub", link: "#" },
    { icon: <FaTwitter />, label: "Twitter", link: "#" },
  ];

  return (
    <section id="contato" className="py-20 bg-gradient-to-b from-roxo to-roxo/90 text-white relative overflow-hidden">
      {/* Decoração */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-verde rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl opacity-90">
            Tem dúvidas? Sugestões? Fale conosco!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-6">Envie uma Mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:border-verde focus:outline-none transition-colors text-white placeholder-white/50"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:border-verde focus:outline-none transition-colors text-white placeholder-white/50"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Mensagem</label>
                <textarea
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:border-verde focus:outline-none transition-colors text-white placeholder-white/50 h-32 resize-none"
                  placeholder="Sua mensagem..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-verde hover:bg-verde/90 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
              >
                {enviado ? "✓ Mensagem Enviada!" : "Enviar Mensagem"}
              </button>
            </form>
          </motion.div>

          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Outras Formas de Contato</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-verde rounded-full p-3">
                    <FaEnvelope className="text-2xl" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-white/80">contato@codelingo.com</div>
                  </div>
                </div>

                <div className="border-t border-white/20 my-6"></div>

                <div>
                  <h4 className="font-semibold mb-4 text-lg">Redes Sociais</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        className="bg-white/10 hover:bg-verde transition-colors rounded-full p-4 text-2xl transform hover:scale-110"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-verde to-verde/80 rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Junte-se à Comunidade!</h3>
              <p className="mb-6 opacity-90">
                Conecte-se com outros aprendizes, compartilhe dúvidas e conquistas!
              </p>
              <button className="bg-white text-verde font-bold py-3 px-8 rounded-full hover:bg-white/90 transform hover:scale-105 transition-all">
                Entrar no Discord
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}