import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Form from "./components/Form";
import { useState } from "react";
import Grid from "./components/Grid";

interface Data {
	current: Expense[];
	updated: Expense[];
}

function App() {
	const [expenses, setExpenses] = useState<Data>({ current: [], updated: [] });

	const handleSubmit = (data: Expense): void => {
		data.id = generateId();
		setExpenses({
			current: [...expenses.current, data],
			updated: [...expenses.updated, data],
		});
	};

	const handleDelete = (id: number): void => {
		setExpenses({
			current: [...expenses.current.filter((item) => item.id !== id)],
			updated: [...expenses.updated.filter((item) => item.id !== id)],
		});
	};

	const handleFilter = (filter: string) => {
		setExpenses({
			current: [...expenses.current],
			updated: [
				...expenses.current.filter(
					(item) => item.category === filter || filter === "All Categories"
				),
			],
		});
	};

	const generateId = (): number => {
		let count = 1;
		for (let index = 1; index <= expenses.current.length; index++) {
			if (expenses.current.find((item) => item.id === index)) {
				count++;
				continue;
			}

			break;
		}

		return count;
	};

	return (
		<>
			<div className="container border rounded  p-4 my-3">
				<Form onSubmit={handleSubmit}></Form>
			</div>
			<div className="container border rounded  p-4 my-3">
				<Grid
					data={expenses.updated}
					onDelete={handleDelete}
					onFilter={handleFilter}
				></Grid>
			</div>
		</>
	);
}

export default App;
