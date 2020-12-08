import React from "react";
import styled from "styled-components";

import { themeColor } from "../GlobalStyle";

const Layout = styled.input.attrs({ placeholder: "Search" })`
	background-color: ${themeColor.light};
	border: 1px solid ${themeColor.light};
	color: ${themeColor.white};
	outline: none;
	padding: 5px;
	width: calc(100%-20px);
	margin: 10px;

	&:focus {
		border: 1px solid #247BC3;
	}

	&::placeholder {
		color: #979797;
	}
`;

export default function Filter() {
	return (
		<Layout/>
	);
}
