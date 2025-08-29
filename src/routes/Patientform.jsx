import { useState } from 'react';
import React from "react";
import { supabase } from '../supabaseClient.js'



function Patientform({pacienteDados}) {


  const [nome, setNome] = useState(pacienteDados.nome)
  const [nomeSocial, setNomeSocial] = useState(pacienteDados.nomeSocial)
  const [dataNascimento, setDataNasc] = useState(pacienteDados.dataNascimento)
  const [genero, setGenero] = useState(pacienteDados.genero)
  const [tipoDoc, setTipoDoc] = useState(pacienteDados.tipoDoc)
  const [numDoc, setNumDoc] = useState(pacienteDados.numDoc)
  const [cpf, setCpf] = useState(pacienteDados.cpf)
  const [profissao, setProfissao] = useState(pacienteDados.profissao)
  const [nomeMae, setNomeMae] = useState(pacienteDados.nomeMae)
  const [profissaoMae, setProfissaoMae] = useState(pacienteDados.profissaoMae)
  const [nomePai, setNomePai] = useState(pacienteDados.nomePai)
  const [profissaoPai, setProfissaoPai] = useState(pacienteDados.profissaoPai)
  const [nomeResp, setNomeResp] = useState(pacienteDados.nomeResp)
  const [cpfResp, setCpfResp] = useState(pacienteDados.cpfResp)
  const [nomeEsposo, setNomeEsposo] = useState(pacienteDados.nomeEsposo)
  const [idOutroSistema, setIdOutroSistema] = useState(pacienteDados.idOutroSistema)
  const [rnGuiaConvenio, setRnGuiaConvenio] = useState(pacienteDados.rnGuiaConvenio)
  const [nacionalidade, setNacionalidade] = useState(pacienteDados.nacionalidade)
  //const [foto, setFoto] = useState(null)
  const [telefone1, setTelefone1] = useState(pacienteDados.telefone1)
  const [telefone2, setTelefone2] = useState(pacienteDados.telefone2)
  const [telefone3, setTelefone3] = useState(pacienteDados.telefone3)  

  const [rua, setRua] = useState(pacienteDados.rua)
  const [numero, setNumero] = useState(pacienteDados.numero)
  const [complemento, setComplemento] = useState(pacienteDados.complemento)
  const [bairro, setBairro] = useState(pacienteDados.bairro)
  const [cidade, setCidade] = useState(pacienteDados.cidade)
  const [estado, setEstado] = useState(pacienteDados.cidade)
  const [unidadeFederativa, setUnidadeFederativa] = useState(pacienteDados.unidadeFederativa)

  const [cep, setCep] = useState(pacienteDados.cep)

  const [observações, setObservs] = useState(pacienteDados.observações)

  const [convenio, setConvenio] = useState(pacienteDados.convenio)

  const [localizacao, setLocal] = useState({
    bairro:'',
    estado:'',
    cidade:'',
    rua:''
  })



  const handleSubmit = async (e) => {
    e.preventDefault()

    const {data, error} = await supabase
    .from('pacientes')
    .insert([
      {
        nome,
        nomeSocial,
        dataNascimento,
        genero,
        tipoDoc,
        numDoc,
        cpf,
        profissao,
        nomeMae,
        profissaoMae,
        nomePai,
        profissaoPai,
        nomeResp,
        cpfResp,
        nomeEsposo,
        idOutroSistema,
        rnGuiaConvenio,
        nacionalidade,
        telefone1,
        telefone2,
        telefone3,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        unidadeFederativa,
        observações,
        convenio
      }
    ]);
     if (error) {
      console.error("Erro ao inserir paciente:", error);
      alert("Erro ao salvar paciente!");
    } else {
      console.log("Paciente inserido:", data);
      alert("Paciente cadastrado com sucesso!");
     
     
    }

  }

  const validarCEP = (valor) => {

    let v = formatarCEP(valor)
    setCep(v)


    if(valor.length === 8){
    fetch(`https://viacep.com.br/ws/${valor}/json/`)
    .then(response => response.json())
    .then(dado => {console.log(dado)
      
      let local = {
        bairro: dado['bairro'],
        estado: dado['estado'],
        cidade: dado['localidade'],
        rua: dado['logradouro']


      }

      setRua(dado['logradouro'])
      setBairro(dado['bairro'])
      setCidade(dado['localidade'])
      setEstado(dado['estado'])
      setUnidadeFederativa(dado['uf'])

      setLocal(local)
      
      console.log(local)

     

    }
  )
    .catch(erro => console.log(erro))
}
  }


  // Formatar o CPF para ficar no formato padrão 000.000.00-00
  
  const formatData = (valor) => {
    if(valor.length === 10){
      let numerosData = valor.replace(/\D/g, '')
      setDataNasc(numerosData)
     
    }
    return valor
    
    .replace(/\D/g, '')
    
    .replace(/(\d{2})(\d{2})/, '$1/$2/')
    //.replace(/(\d{2})/, '/$1' )
    .slice(0,11)
  }
  
  
  const formatCPF = (valor) => {
    if(valor.length === 14){
      let numerosCPF = valor.replace(/\D/g, '')
      setCpf(numerosCPF)
     
    }
    
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatarTel = (valor, id) => {
    if(id === 'telefone1' && valor.length === 16){
      let numerosTel1 = valor.replace(/\D/g, '')
      setTelefone1(numerosTel1)
    }
    if(id === 'telefone2' && valor.length === 16){
      let numerosTel2 = valor.replace(/\D/g, '')    
      setTelefone2(numerosTel2)
    }
    if(id === 'telefone3' && valor.length === 16){
      let numerosTel3 = valor.replace(/\D/g, '')
      setTelefone3(numerosTel3)
    }

    console.log(id)
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
      

      <form className="form_paciente" action="" onSubmit= { (e) => handleSubmit(e)}>

        <h2>Dados Pessoais</h2> 

          <div>
            <input type="file" />
          </div>

          <section className='form_principal'>

            <div>
                <label htmlFor="text">Nome:</label>
                <input type="text" placeholder="Insira seu nome aqui" value={nome}  onChange={(e) => setNome(e.target.value)}/>

            </div>

            <div>
                <label htmlFor="text">Nome social:</label>
                <input type="text" placeholder="" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="text" >Data de nascimento:</label>
                <input type= 'text' placeholder="Insira sua data de nascimento aqui" value={dataNascimento} onChange={ (e) => e.target.value = formatData(e.target.value)}/>
            </div>

            <div>
              <label htmlFor="seletor_genero">Qual gênero você se identifica:</label>
                <select name="seletor_genero" id="" value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="">Selecione seu gênero</option>
                <option value="masculino"> Masculino</option>
                <option value="feminino"> Feminino</option>
                <option value="outro">Outro</option>    
                </select>

            </div>
        

        <div>
            <label>Escolher outro document:</label>
            <select name="documentos" id=""  onChange={(e) => setTipoDoc(e.target.value)}>
                <option value="">Outros tipos de documento</option>
                <option value="cnh">CNH</option>
                <option value="passaporte">Passaporte</option>

             </select>
          </div>

          <div>

            <label htmlFor="text">Número do documento</label>
            <input type="text" placeholder="Insira seu número de documento" value={numDoc} onChange={(e) => setNumDoc(e.target.value)}/>
          </div>
      
      <div>
        <label htmlFor="text">CPF:</label>
        <input type="text" placeholder="Insira seu CPF" value={cpf} onChange={(e) => e.target.value = formatCPF(e.target.value)} />
      </div>

      <div>

        <label htmlFor="text">Profissão:</label>
        <input type="text" placeholder="Insira sua profissão" value={profissao} onChange={(e) => setProfissao(e.target.value)}/>
      </div>

      <div>
        <label htmlFor="nacionalidade">Nacionalidade</label>
        <input type="text" name="nacionalidade" value={nacionalidade} onChange={(e) => setNacionalidade(e.target.value)}/>

      </div>
  
      <div>
            <label htmlFor='text'>Nome da Mãe</label>
            <input type="text" placeholder="Nome da mãe" value={nomeMae} onChange={(e) => setNomeMae(e.target.value)}/>

      </div>

          '<div>

            <label htmlFor="text">Profissão da mãe</label>
            <input type="text" placeholder="Insira aqui" onChange={(e) => setProfissaoMae(e.target.value)}/>

        </div>

        <div>
            <label htmlFor="text">Nome do Pai</label>
            <input type="text" placeholder="Insira nome do pai" onChange={(e) => setNomePai(e.target.value)}/>

        </div>

          <div>  

            <label htmlFor="text">Profissão do Pai</label>
            <input type="text" placeholder="Insira profissão do pai" onChange={ (e) => setProfissaoPai(e.target.value)}/>

          </div>



        <div>
            <label htmlFor="text"> Nome do responsavel</label>
            <input type="text" placeholder="Insira nome do responsável"  onChange={(e) => setNomeResp(e.target.value)} />

        </div>

        <div>
            <label htmlFor="text">CPF do responsável</label>
            <input type="text" placeholder="CPF do responsavel" onChange= {(e) => setCpfResp(e.target.value)} />
        </div>

        <div>
            <label htmlFor="text">Nome do esposo(a)</label>
            <input type="text" placeholder="Opcional" onChange={(e) => setNomeEsposo(e.target.value)}/>

         </div>

        <div>

            <label htmlFor="text">Identificador de outro sistema</label>
            <input type="text" onChange={(e) => setIdOutroSistema(e.target.value)} />

        </div>

      </section>

        <div>

            <label htmlFor="radio">RN na guia de convênio </label>
            <input type="radio" value="true" onChange={(e) => setRnGuiaConvenio(e.target.value)} />
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
            <input type="text" placeholder="Insira a cidade" value={localizacao["cidade"]}  readOnly/>
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
            <input type="text" placeholder="Insira o número" onChange={(e) => setNumero(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="text">Complemento</label>
            <input type="text" placeholder="Insira o complemento" onChange={(e) => setComplemento(e.target.value)}/>
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
              <input type="text" 
              placeholder="(XX) X XXXX-XXXX" 
              id='telefone1' 
              onChange ={(e) => e.target.value = formatarTel(e.target.value, e.target.id)}/>
            </div>
            <div>
              <label htmlFor="text">Telefone 2</label>
              <input 
              type="text" 
              placeholder="(XX) X XXXX-XXXX"
              id='telefone2'
              onChange={(e) => e.target.value = formatarTel(e.target.value, e.target.id)} />

            </div>
            <div>
              <label htmlFor="text">Telefone 3</label>
              <input 
              type="text"
              placeholder="(XX) X XXXX-XXXX" 
              id='telefone3' 
              onChange={(e) => e.target.value = formatarTel(e.target.value, e.target.id)} />
            </div>
            
          </div>
        </details>


        <details>
          <summary>Informações Adicionais</summary>

          <label htmlFor='observacoes'>Observações como alergia,restrições, etc</label>
          <textarea  cols="30" rows="10" placeholder="Observações" onChange={ (e) => setObservs(e.target.value)}></textarea>


        </details>
    </section>  

      
      
      <input type="submit"  />
      <button>Cancelar</button>
      
      </form>
      
    </div>
  );
}


export default Patientform