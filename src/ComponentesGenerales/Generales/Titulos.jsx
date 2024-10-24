import styled from "styled-components"
export const TxtGenerico = styled.p`
    user-select: none;
    text-align: center;
    font-size: ${props => props.size ? props.size : '14px'};
    color: ${props => props.color ? props.color : ''};
    font-weight: ${props => props.bold ? 'bold' : ''};
    margin: ${props => props.margin ? props.margin : '10px 0'};
` 