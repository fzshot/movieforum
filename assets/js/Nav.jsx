import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'element-react';

import 'element-theme-default';

function Nav(props) {

	function onSelect() {

	}
	return (
		<div>
			<Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
				<Menu.Item index="1">
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item index="2">
					<Link to="/">Movie Search</Link>
				</Menu.Item>
				<Menu.Item index="3">
					<Link to="/">Movie Hello</Link>
				</Menu.Item>
			</Menu>


		</div>

	)


}
