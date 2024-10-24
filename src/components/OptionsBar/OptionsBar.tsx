import styles from './OptionsBar.module.css'
import { FilterByStatusType, StatusTypes } from "../../types/types";


interface OptionsBarProps {
	todosLeft: number;
	category: FilterByStatusType;
	setCategory: (category: FilterByStatusType) => void
	clearCompleted: () => void;
}

const OptionsBar: React.FC<OptionsBarProps> = ({ todosLeft, category, setCategory, clearCompleted }) => {


	return (
		<div className={styles.wrapper}>
			<div className={styles.counter}>
				{todosLeft !== 0
					? <span>{todosLeft} items left</span>
					: <span>All completed</span>
				}
			</div>
			<div className={styles.btnsGroup}>
				<span
					data-testid='category-all'
					className={category === StatusTypes.ALL ? styles.btn + ' ' + styles.active : styles.btn}
					onClick={() => setCategory(StatusTypes.ALL)}
				>
					All
				</span>
				<span
					data-testid='category-active'
					className={category === StatusTypes.ACTIVE ? styles.btn + ' ' + styles.active : styles.btn}
					onClick={() => setCategory(StatusTypes.ACTIVE)}
				>
					Active
				</span>
				<span
					data-testid='category-completed'
					className={category === StatusTypes.COMPLETED ? styles.btn + ' ' + styles.active : styles.btn}
					onClick={() => setCategory(StatusTypes.COMPLETED)}
				>
					Completed
				</span>
			</div>
			<div className={styles.btnClear}>
				<span data-testid='clear-completed' className={styles.btn} onClick={() => clearCompleted()}>
					Clear completed
				</span>
			</div>
		</div>
	)
}

export default OptionsBar