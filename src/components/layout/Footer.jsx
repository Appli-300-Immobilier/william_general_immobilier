import { Link } from 'react-router-dom';
import { Facebook, MessageCircle } from 'lucide-react'; const Footer = () => { return ( <footer className="bg-secondary-dark text-slate-300 py-12 no-print"> <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8"> {/* Brand */} <div> <h3 className="text-white text-lg font-heading font-bold mb-4">William General Immobilier</h3> <p className="text-sm leading-relaxed"> Votre partenaire de confiance pour l'ééquipement professionnel et domestique au Côte d'Ivoire. </p> </div> {/* Links */} <div> <h4 className="text-white font-medium mb-4">Navigation</h4> <ul className="space-y-2 text-sm"> <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li> <li><Link to="/a-propos" className="hover:text-white transition-colors"> À Propos</Link></li> <li><Link to="/catalogue" className="hover:text-white transition-colors">Catalogue</Link></li> <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li> </ul> </div> {/* Mentions Légales */} <div> <h4 className="text-white font-medium mb-4">Légal</h4> <ul className="space-y-2 text-sm"> <li><Link to="/cgv" className="hover:text-white transition-colors">CGV</Link></li> <li><Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link></li> </ul> </div> {/* Contact */} <div> <h4 className="text-white font-medium mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>- AGENCE IMMOBILIÈRE</li>
<li>- Maisons  Terrains  Magasins </li>
<li>- Gestions de bien Immobilier</li>
<li>- : +225 2731937576</li>
<li>- 0703313371</li>
            <li>Email: contact@williamgeneralimmobilier.cm</li>
            
            <li className="flex items-center gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-lg" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://wa.me/237658204821" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg" title="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
            </li>
          </ul> </div> </div> <div className="border-t border-slate-700 mt-12 pt-8 text-center text-xs">  {new Date().getFullYear()} GIORTECH Inc. Tous droits réservés. </div> </footer> );
}; export default Footer;
