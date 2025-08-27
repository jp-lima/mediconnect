import { useState } from 'react';
import React from "react";
import { supabase } from '../supabaseClient.js'

import {Link} from 'react-router-dom'

//convenio, conectar label no input, VIP, só aparecer pais se data der alguém de menor, botão ações, clicar no paciente e aparecer todos os dados (apenas visualizar)

// Feito:  melhorar RN no convenio,  formatar cpf pais,


function Patientform() {

  function getAge(dataNascimento){
  const [dia, mes, ano] = dataNascimento.split('/').map(Number);

  const hoje = new Date();
  const nascimento = new Date(ano, mes - 1, dia); // mês começa em 0

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  // Ajusta caso o aniversário ainda não tenha acontecido esse ano
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();
  if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
    idade--;
  }

  return idade

  }
  
  const [responsaveisVisiveis, setVisibilidade] = useState(false)

  const [nome, setNome] = useState('')
  const [nomeSocial, setNomeSocial] = useState('')
  const [dataNascimento, setDataNasc] = useState('')
  const [genero, setGenero] = useState('')
  const [tipoDoc, setTipoDoc] = useState('')
  const [numDoc, setNumDoc] = useState('')
  const [cpf, setCpf] = useState('')
  const [profissao, setProfissao] = useState('')
  const [nomeMae, setNomeMae] = useState('')
  const [profissaoMae, setProfissaoMae] = useState('')
  const [nomePai, setNomePai] = useState('')
  const [profissaoPai, setProfissaoPai] = useState('')
  const [nomeResp, setNomeResp] = useState('')
  const [cpfResp, setCpfResp] = useState('')
  const [nomeEsposo, setNomeEsposo] = useState('')
  const [idOutroSistema, setIdOutroSistema] = useState('')
  const [rnGuiaConvenio, setRnGuiaConvenio] = useState(false)
  const [nacionalidade, setNacionalidade] = useState('')
  //const [foto, setFoto] = useState(null)
  const [telefone1, setTelefone1] = useState('')
  const [telefone2, setTelefone2] = useState('')
  const [telefone3, setTelefone3] = useState('')  

  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [unidadeFederativa, setUnidadeFederativa] = useState('')

  const [cep, setCep] = useState('')

  const [observações, setObservs] = useState('')

  const [convenio, setConvenio] = useState('')

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
        nome_social: nomeSocial,
        data_nascimento: dataNascimento,
        genero,
        tipo_documento: tipoDoc,
        numero_documento: numDoc,
        cpf,
        profissao,
        nome_mae: nomeMae,
        profissao_mae: profissaoMae,
        nome_pai: nomePai,
        profissao_pai: profissaoPai,
        nomeResp: nomeResp,
        cpfResp: cpfResp,
        nome_esposo: nomeEsposo,
        id_outro_sistema: idOutroSistema,
        rn_guia_convenio: rnGuiaConvenio,
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
        unidadeFederativa: unidadeFederativa,
        observações: observações,
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

      let idade = getAge(valor)



      // Os campos sobre CPF do responsavel e Nome do responsavel só aparecem se o usuário for de menor
      if(idade < 18){
        console.log('de menor')
        setVisibilidade(true)
      }
      
      setDataNasc(valor)
     
    }
    return valor
    
    .replace(/\D/g, '')
    
    .replace(/(\d{2})(\d{2})/, '$1/$2/')
  
    .slice(0,11)
  }
  
  
  const formatCPF = (valor, id) => {
    if(valor.length === 14){

      
      let numerosCPF = valor.replace(/\D/g, '')
      
      if(id === 'cpf' ){setCpf(numerosCPF)}

      if(id === 'cpfresp'){setCpfResp(numerosCPF)}

      console.log(id, numerosCPF)
     
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

      <button>
        <Link to='/'> voltar sem salvar </Link>
      </button>
      

      <form className="form_paciente" action="" onSubmit= { (e) => handleSubmit(e)}>

        <h2>Dados Pessoais</h2> 

          <div>
            <input type="file" />
          </div>

          <section className='form_principal'>

            <div>
                <label htmlFor="input_nome">Nome:</label>
                <input id="input_nome" type="text" placeholder="Insira seu nome aqui" onChange={(e) => setNome(e.target.value)}/>

            </div>

            <div>
                <label htmlFor="input_nomesocial">Nome social:</label>
                <input id="input_nomesocial" type="text" placeholder="" onChange={(e) => setNomeSocial(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="input_data" >Data de nascimento:</label>
                <input id="input_data" type= 'text' placeholder="Insira sua data de nascimento aqui" onChange={ (e) => e.target.value = formatData(e.target.value) }/>
            </div>

            {/*(e) => e.target.value = formatData(e.target.value)*/}

            <div>
              <label htmlFor="seletor_genero">Qual gênero você se identifica:</label>
                <select id="seletor_genero"  onChange={(e) => setGenero(e.target.value)}>
                <option value="">Selecione seu gênero</option>
                <option value="masculino"> Masculino</option>
                <option value="feminino"> Feminino</option>
                <option value="outro">Outro</option>    
                </select>

            </div>
        

        <div>
            <label>Escolher outro document:</label>
            <select name="documentos" id="" onChange={(e) => setTipoDoc(e.target.value)}>
                <option value="">Outros tipos de documento</option>
                <option value="cnh">CNH</option>
                <option value="passaporte">Passaporte</option>

             </select>
          </div>

          <div>

            <label htmlFor="input_numerodocumento">Número do documento</label>
            <input id="input_numerodocumento" type="text" placeholder="Insira seu número de documento" onChange={(e) => setNumDoc(e.target.value)}/>
          </div>
      
      <div>
        <label htmlFor="input_cpf">CPF:</label>
        <input id="input_cpf" type="text" placeholder="Insira seu CPF" onChange={(e) => e.target.value = formatCPF(e.target.value, e.target.id)} />
      </div>

      <div>

        <label htmlFor="input_profissao">Profissão:</label>
        <input id="input_profissao" type="text" placeholder="Insira sua profissão" onChange={(e) => setProfissao(e.target.value)}/>
      </div>

      <div>
        <label htmlFor="nacionalidade">Nacionalidade</label>
        <input  type="text" id="nacionalidade" onChange={(e) => setNacionalidade(e.target.value)}/>

      </div>
  
      <div>
            <label htmlFor='input_nomemae'>Nome da Mãe</label>
            <input  id="input_nomemae" type="text" placeholder="Nome da mãe" onChange={(e) => setNomeMae(e.target.value)}/>

      </div>

          '<div>

            <label htmlFor="input_profissao_mae">Profissão da mãe</label>
            <input id="input_profissa_omae" type="text" placeholder="Insira aqui" onChange={(e) => setProfissaoMae(e.target.value)}/>

        </div>

        <div>
            <label htmlFor="text">Nome do Pai</label>
            <input type="text" placeholder="Insira nome do pai" onChange={(e) => setNomePai(e.target.value)}/>

        </div>

          <div>  

            <label htmlFor="text">Profissão do Pai</label>
            <input type="text" placeholder="Insira profissão do pai" onChange={ (e) => setProfissaoPai(e.target.value)}/>

          </div>


        
        {responsaveisVisiveis&&
        <div> 
        <div>
            <label htmlFor="text"> Nome do responsavel</label>
            <input type="text" placeholder="Insira nome do responsável"  onChange={(e) => setNomeResp(e.target.value)} />

        </div>

        <div>
            <label htmlFor="text">CPF do responsável</label>
            <input id="cpfresp" type="text" placeholder="CPF do responsavel" onChange= {(e) => e.target.value = formatCPF(e.target.value, e.target.id)} />
        </div>
        </div>}
        
        

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
            <input type="checkbox" value="true" onChange={(e) => setRnGuiaConvenio(e.target.value)} />
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
            <input type="text" placeholder="Insira a cidade" onChange= {(e) => { setCidade(e.target.value)}} />
          </div>

          <div>
            <label htmlFor="text">Estado</label>
            <input type="text" placeholder="Insira o estado"
             onChange= {(e) => { setEstado(e.target.value)} }/>
          </div>
            
          <div>
            <label htmlFor="text">Bairro</label>
            <input type="text" placeholder="Insira o bairro" 
            onChange= {(e) => setBairro(e.target.value)}/>
          </div>

          <div>
            <label htmlFor="text">Rua</label>
            <input type="text" placeholder="Insira sua rua" 
            onChange= {(e) =>  setRua(e.target.value)} />
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