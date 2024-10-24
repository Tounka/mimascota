import styled from "styled-components"
export const BtnGenerico = styled.button `
    width: ${props => props.width ? props.width : '120px'} ;
    height: ${props => props.height ? props.height : '60px'} ;
    color: ${props => props.color ? props.color : ''};
    background-color: ${props => props.bgColor ? props.bgColor : ''};
    padding: 10px;
    font-size: 22px;
    font-weight: bold;
    border-radius: 10px;
    border: none;

    cursor: pointer;
    display: flex;
    justify-content:center;
    align-items: center;
    gap: 10px;
`