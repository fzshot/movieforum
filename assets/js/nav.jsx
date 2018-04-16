import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import { Button, Menu} from 'element-react';



export default function Nav(props) {


	return (
		<div>
			<Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" width="100%" >
				<Menu.Item index="1">
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item index="2">
					<Link to="/">Movie Search</Link>
				</Menu.Item>
				<Menu.Item index="3">
					<Link to="/">Movie Forum</Link>
				</Menu.Item>
			</Menu>


		</div>

	);


}
