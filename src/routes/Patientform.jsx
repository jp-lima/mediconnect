import { useState } from 'react';
import React from "react";


function Patientform() {

  const [cep, setCep] = useState('')

  const [localizacao, setLocal] = useState({
    bairro:'',
    estado:'',
    cidade:'',
    rua:''
  })
  //bairro
  //estado
  //cidade
  //rua ou logradouro



  const validarCEP = (valor) => {

    let v = formatarCEP(valor)
    setCep(v)
    console.log(v)

    if(valor.length === 8){
    fetch(`https://viacep.com.br/ws/${valor}/json/`)
    .then(response => response.json())
    .then(dado => {console.log(dado)
      
      let local = {
        bairro:dado['bairro'],
        estado:dado['estado'],
        cidade:dado['localidade'],
        rua:dado['logradouro']


      }

      setLocal(local)
      
      console.log(local)

     

    }
  )
    .catch(erro => console.log(erro))
}
  }


  // Formatar o CPF para ficar no formato padrão 000.000.00-00
  
  const formatData = (valor) => {
    return valor
    
    .replace(/\D/g, '')
    
    .replace(/(\d{2})(\d{2})/, '$1/$2/')
    //.replace(/(\d{2})/, '/$1' )
    .slice(0,11)
  }
  
  
  const formatCPF = (valor) => {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatarTel = (valor) => {
    return valor
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2 ')
    .replace(/( \d{4})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
    
  }
  
  const formatarCEP = (valor) => {
    return valor
    .replace(/\D/g, '')
    .slice(0,8)
    
  }
  
  
  
  
  return (
    <div >
      

      <form className="form_paciente" action="">

        <h2>Dados Pessoais</h2> 

          <div>
            <input type="file" />
          </div>

          <section className='form_principal'>

            <div>
                <label htmlFor="text">Nome:</label>
                <input type="text" placeholder="Insira seu nome aqui" />

            </div>

            <div>
                <label htmlFor="text">Nome social:</label>
                <input type="text" placeholder="" />
            </div>

            <div>
                <label htmlFor="text" >Data de nascimento:</label>
                <input type= 'text' placeholder="Insira sua data de nascimento aqui" onChange={ (e) => e.target.value = formatData(e.target.value)}/>
            </div>

            <div>
                <select name="" id="">
                <option value="">Selecione seu gênero</option>
                <option value="masculino"> Masculino</option>
                <option value="feminino"> Feminino</option>
                <option value="outro">Outro</option>    
                </select>

            </div>
        

        <div>
            <label>Escolher outro document:</label>
            <select name="documentos" id="">
                <option value="">Outros tipos de documento</option>
                <option value="cnh">CNH</option>
                <option value="passaporte">Passaporte</option>

             </select>
          </div>

          <div>

            <label htmlFor="text">Número do documento</label>
            <input type="text" placeholder="Insira seu número de documento" />
          </div>
      
      <div>
        <label htmlFor="text">CPF:</label>
        <input type="text" placeholder="Insira seu CPF" onChange={(e) => e.target.value = formatCPF(e.target.value)} />
      </div>

      <div>

        <label htmlFor="text">Profissão:</label>
        <input type="text" placeholder="Insira sua profissão" />
      </div>
  
      <div>
            <label htmlFor='text'>Nome da Mãe</label>
            <input type="text" placeholder="Nome da mãe"/>

      </div>

          '<div>

            <label htmlFor="text">Profissão da mãe</label>
            <input type="text" placeholder="Insira aqui" />

        </div>

        <div>
            <label htmlFor="text">Nome do Pai</label>
            <input type="text" placeholder="Insira nome do pai" />

        </div>

          <div>  

            <label htmlFor="text">Profissão do Pai</label>
            <input type="text" placeholder="Insira profissão do pai" />

          </div>



        <div>
            <label htmlFor="text"> Nome do responsavel</label>
            <input type="text" placeholder="Insira nome do responsável" />

        </div>

        <div>
            <label htmlFor="text">CPF do responsável</label>
            <input type="text" placeholder="CPF do responsavel" />
        </div>

        <div>
            <label htmlFor="text">Nome do esposo(a)</label>
            <input type="text" placeholder="Opcional"/>

         </div>

        <div>

            <label htmlFor="text">Identificador de outro sistema</label>
            <input type="text" />

        </div>

      </section>

        <div>

            <label htmlFor="radio">RN na guia de convênio </label>
            <input type="radio" value="true" />
        </div>

      <section className='end-ctt-obs'>
        
        <details>
          <summary>Endereço</summary>
          <div className='detalhes_amais'>

          <div>
            <label htmlFor="text">CEP</label>
            <input type="text" placeholder="Insira o CEP" value={cep} onChange={(e) => validarCEP(e.target.value)}/>
          </div>


          <div>    
            <label htmlFor="text">Cidade</label>
            <input type="text" placeholder="Insira a cidade" value={localizacao["cidade"]} readOnly/>
          </div>

          <div>
            <label htmlFor="text">Estado</label>
            <input type="text" placeholder="Insira o estado" value={localizacao["estado"]} readOnly/>
          </div>
            
          <div>
            <label htmlFor="text">Bairro</label>
            <input type="text" placeholder="Insira o bairro" value={localizacao["bairro"]} readOnly/>
          </div>

          <div>
            <label htmlFor="text">Rua</label>
            <input type="text" placeholder="Insira sua rua" value={localizacao["rua"]} readOnly/>
          </div>
          <div>
            <label htmlFor="text">Número</label>
            <input type="text" placeholder="Insira o número" />
          </div>
          <div>
            <label htmlFor="text">Complemento</label>
            <input type="text" placeholder="Insira o complemento" />
          </div>
          </div>
        </details>
        
        <details>
          <summary>Contato</summary>
          <div className='detalhes_amais'>

            <div>
              <label htmlFor="text">E-mail</label>
              <input type="email" placeholder="exemplo12@dominio.com" />
            </div>

            <div>
              <label htmlFor="text">Telefone</label>
              <input type="text" placeholder="(XX) X XXXX-XXXX" onChange ={(e) => e.target.value = formatarTel(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="text">Telefone 2</label>
              <input type="text" placeholder="(XX) X XXXX-XXXX" onChange={(e) => e.target.value = formatarTel(e.target.value)} />
            </div>
            <div>
              <label htmlFor="text">Telefone 3</label>
              <input type="text" placeholder="(XX) X XXXX-XXXX" onChange={(e) => e.target.value = formatarTel(e.target.value)} />
            </div>
            
          </div>
        </details>


        <details>
          <summary>Informações Adicionais</summary>

          <label htmlFor='observacoes'>Observações como alergia,restrições, etc</label>
          <textarea  cols="30" rows="10" placeholder="Observações"></textarea>


        </details>
    </section>  

      
      
      
      
      </form>
      
    </div>
  );
}


export default Patientform