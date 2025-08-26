import { useState } from 'react';
import './Calculadora.css'

const Calculadora = () => {

    const [valorAtual, setValorAtual] = useState("0");
    const [operacaoPendente, setOperacaoPendente] = useState(null);
    const [valorPendente, setValorPendente] = useState(null);
    const [operacaoConmpleta, setOperacaoCompleta] = useState("");

    const numerosTeclado = ["1","2","3","4","5","6","7","8","9","0"];
    const operacao = ["+","-","*","/"];

    // Função para inserir numero.
    const inserirNumero = (val) =>{
        setValorAtual((valortemp) =>{
            if(valortemp === "0"){
                return val;
            }else{
                return valortemp + val;
            }
        });
        setOperacaoCompleta((prevOp) => prevOp + val);
    };

    // Função paara inserir o operador.
    const inserirOperacao = (op) => {
        setOperacaoCompleta(valorAtual + " " + op + " ");
        setOperacaoPendente(op);
        setValorPendente(valorAtual);
        setValorAtual("0");
    };

    // Função para zerar a calculadora.
    const apagar = () => {
        setValorAtual("0");
        setOperacaoPendente(null);
        setValorPendente(null);
        setOperacaoCompleta("0");

    };

    // Função para realizar o cálculo.
    const calcular = () => {
        if(!operacaoPendente || !valorPendente){
            return;
        }

        const num1 = parseFloat(valorPendente);
        const num2 = parseFloat(valorAtual);

        let result;

        switch(operacaoPendente){
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                if(num2 !== 0){
                    result = num1 / num2;
                }else{
                    setValorAtual("Error");
                    setOperacaoCompleta("Error");
                    setOperacaoPendente(null);
                    setValorPendente(null);
                    return;
                }

            default:
                break;
        }

        setOperacaoCompleta(
            valorPendente +
            " " +
            operacaoPendente +
            " " +
            valorAtual +
            " = " +
            result
        );
        setValorAtual(result.toString());
        setOperacaoPendente(null);
        setValorPendente(null);

    };

    return (
        <div className="calculadora">
            <div className="operacao">{operacaoConmpleta}</div>
            <div className="display">{valorAtual}</div>
            <div className="btn">
                <button onClick={() => apagar()}>AC</button>
                {numerosTeclado.map((num)=>(
                    <button key={(num)} onClick={() =>inserirNumero(num) }>{num}</button>
                ))}
                {operacao.map((op)=>(
                    <button key={(op)} onClick={() => inserirOperacao(op)}>{op}</button>
                ))}
                <button onClick={calcular}>=</button>
            </div>
        </div>
    );
};

export default Calculadora;



// ajustar o número zero aparece no inicio da operação e bloquear a inserção de números após o resultado no próximo commmit!
// adicionar o Readme