import React from "react"; 
import './Dashboard.css';

const Dashboard = () =>{ 

    return ( 
      <>
        <div className="left-section">
          <div className="sidebar">
              <h2>Planilha</h2>
           
           <div className="item active">
              <i className="ri-apps-line"></i>
              <h3>Dashboard</h3>
           </div>
           <div className="item">
              <i className="ri-folder-line"></i>
              <h3>Arquivos</h3>
           </div>
           <div className="item">
              <i className="ri-hard-drive-3-line"></i>
              <h3>Disco</h3>
           </div>
           <div className="item">
              <i className="ri-folder-line"></i>
              <h3>Your files</h3>
           </div>
           <div className="item">
              <i className="ri-folder-line"></i>
              <h3>Protected</h3>
           </div>
           <div className="item">
              <i className="ri-folder-line"></i>
              <h3>Dashboard</h3>
           </div>
           </div>
           <div className="sign-out">
              <i className="ri-logout-box-r-line"></i>
              <h3>Sign Out</h3>
           </div>                      
        </div>     

        <div className="main">
             <div className="header">
               <div className="search">
                  <button><i className="ri-search-2-line"></i></button>
                  <input type="text" placeholder="Pesquisar"/>
                  <i className="ri-equalizer-line"></i>
               </div>
               <div className="icon-btns">
                  <i className="ri-notification-line"></i>
                  <i className="ri-message-3-line"></i>
                  <i className="ri-menu-line" id="menu-btn"></i>
               </div>
             </div>
             <h3 class="separator">
                  Acesso rapido
             </h3>
             <div class="quick-access">
             <div class="item">
                <i class="ri-image-fill"></i>
                <h5>Pictures</h5>
                <p>437/500 files</p>
            </div>
            <div class="item">
                <i class="ri-file-3-line"></i>
                <h5>Documents</h5>
                <p>210/500 files</p>
            </div>
            <div class="item">
                <i class="ri-music-2-fill"></i>
                <h5>Sounds</h5>
                <p>90/1000 files</p>
            </div>
            <div class="item">
                <i class="ri-video-on-fill"></i>
                <h5>Videos</h5>
                <p>540/800 files</p>
            </div>
            </div>

            <h3 class="separator">
               Despesas fixas
            </h3>
            
            <table>
               <tbody>
                  <tr class="selected">   
                    <td class="icon"><i class="ri-image-fill"></i></td>                 
                    <td class="name">IMG_10234.png</td>
                    <td class="extension">PNG File</td>
                    <td class="size">2.7 MB</td>
                    <td class="more"><i class="ri-more-fill"></i></td>
                  </tr>
                  <tr>
                    <td class="icon"><i class="ri-file-3-fill"></i></td>
                    <td class="name">My Report.docx</td>
                    <td class="extension">DOCX File</td>
                    <td class="size">5.4 MB</td>
                    <td class="more"><i class="ri-more-fill"></i></td>
                  </tr>
                  <tr>
                    <td class="icon"><i class="ri-file-3-fill"></i></td>
                    <td class="name">My Report.docx</td>
                    <td class="extension">DOCX File</td>
                    <td class="size">5.4 MB</td>
                    <td class="more"><i class="ri-more-fill"></i></td>
                  </tr> 
                  </tbody>
            </table>

        </div>
        <div className="right-section">
        <div class="profile">
            <div class="info"> 
                <div class="account">
                    <h5>Guilherme Gois</h5>
                    <p>guih.smi2@gmail.com</p>
                </div>
            </div>
            <i class="ri-arrow-down-s-line"></i>
        </div>

        <div class="widgets">
            <div class="disk">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                        aria-valuemax="100"></div>
                </div>
                <div class="info">
                    <h5><span>750</span> GB Free<span> / 1</span> TB</h5>
                    <p>Available Storage</p>
                </div>
            </div>
            <div class="bottom">
                <button>New Upload <i class="ri-add-line"></i></button>

                <div class="premium">
                    <div class="title">
                        <i class="ri-folder-add-line"></i>
                        <h5>Buy Premium</h5>
                    </div>
                    <p>Upgrade space now and get a 18% discount.</p>
                </div>
            </div>

        </div>
        </div>
        </>
    )
}

export default Dashboard;