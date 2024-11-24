import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { StateArticleParamsForm } from 'components/article-params-form/ArticleParamsForm';

/** Функция для обработки открытия/закрытия формы */

type ArrowButtonProps = {
	state: StateArticleParamsForm;
	onClick: () => void;
};

export const ArrowButton = ({ state, onClick }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: state === 'open',
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: state === 'open',
				})}
			/>
		</div>
	);
};
