import cn from 'classnames'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { BiBarChartAlt2 } from 'react-icons/bi'
import { BsGearFill } from 'react-icons/bs'
import classes from './Header.module.css'

const Header = () => {
	return (
		<div className={classes.header}>
			<button className={cn(classes.button, classes.infoButton)}>
				<FaRegQuestionCircle className={classes.icon} />
			</button>
			<p className={classes.title}>Mottant</p>
			<button className={cn(classes.button, classes.statButton)}>
				<BiBarChartAlt2 className={classes.icon} />
			</button>
			<button className={cn(classes.button, classes.settingsButton)}>
				<BsGearFill className={classes.icon} />
			</button>
		</div>
	)
}

export default Header;