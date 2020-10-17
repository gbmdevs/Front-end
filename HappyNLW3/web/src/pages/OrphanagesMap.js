import React from 'react';

/* Marcardor do mapa */

import mapMarkerImg from '../images/mapmarker.svg';

import {FiPlus} from 'react-icons/fi';
import {Link}   from 'react-router-dom';


/* Estilo padrão do Leaflet */
import 'leaflet/dist/leaflet.css';
import { Map , TileLayer } from 'react-leaflet';

/* Estilização */
import '../styles/pages/orphanages-map.css';

function Orphanages(){
    return (
        <div id="page-map">
             <aside>
                 <header>
                     <img src={mapMarkerImg} alt="happy" />
                     <h2>Escolha um orfanato no mapa</h2>
                     <p>Muitas crianças estão esperando sua visita :)</p>
                 </header>

                 <footer>
                     <strong>Distrito Federal</strong>
                     <span>Sobradinho I</span>
                 </footer>
             </aside>


 
           <Map
           center={[-15.6558165,-47.7959021]}
           zoom={15}
           style={{ width: '100%', height: '100%'}}
           >
             <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </Map>
    
             <Link to="" className="create-orphanage">
                 <FiPlus size={32} color='#FFF' />
             </Link>


        </div>
    );
}

export default Orphanages;