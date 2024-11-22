import { useState, useRef, useEffect, SyntheticEvent } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Spacing } from 'components/spacing';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { Select } from 'components/select';
import { Text } from 'components/text';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export type StateArticleParamsForm = 'open' | 'close';

export type ArticleParamsFormProps = {
	onChangeStateArticle: (config: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	onChangeStateArticle,
}: ArticleParamsFormProps) => {
	const defaultStateForm = useRef<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement | null>(null);

	const [state, setState] = useState<StateArticleParamsForm>('close');

	const [fontFamily, setfontFamily] = useState<OptionType>(
		defaultStateForm.current.fontFamilyOption
	);
	const [fontSize, setfontSize] = useState<OptionType>(
		defaultStateForm.current.fontSizeOption
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultStateForm.current.backgroundColor
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultStateForm.current.fontColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultStateForm.current.contentWidth
	);

	const toggleState = () => {
		setState(state === 'close' ? 'open' : 'close');
	};

	const changefontFamily = (option: OptionType) => {
		setfontFamily(option);
	};
	const changeFontSize = (option: OptionType) => {
		setfontSize(option);
	};
	const changeBackgroundColor = (option: OptionType) => {
		setBackgroundColor(option);
	};
	const changeFontColor = (option: OptionType) => {
		setFontColor(option);
	};
	const changeContentWidth = (option: OptionType) => {
		setContentWidth(option);
	};

	const handleOnSubmitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		onChangeStateArticle({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
	};

	const handleOnClickButtonReset = () => {
		onChangeStateArticle(defaultStateForm.current);

		setfontFamily(defaultStateForm.current.fontFamilyOption);
		setfontSize(defaultStateForm.current.fontSizeOption);
		setBackgroundColor(defaultStateForm.current.backgroundColor);
		setFontColor(defaultStateForm.current.fontColor);
		setContentWidth(defaultStateForm.current.contentWidth);
	};

	useEffect(() => {
		if (state !== 'open') return;
		const closeOverlay = (e: MouseEvent) => {
			e.target === e.currentTarget && setState('close');
		};
		asideRef.current?.addEventListener('click', closeOverlay);
		return () => {
			asideRef.current?.removeEventListener('click', closeOverlay);
		};
	});

	return (
		<div ref={asideRef} className={clsx(styles.overlay)}>
			<ArrowButton onClick={toggleState} state={state} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: state === 'open',
				})}>
				<form className={styles.form} onSubmit={handleOnSubmitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Spacing size={50} />
					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={changefontFamily}
						title='шрифт'
					/>
					<Spacing size={50} />
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={changeFontSize}
						title='размер шрифта'
					/>
					<Spacing size={50} />
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={changeFontColor}
						title='цвет шрифта'
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						onChange={changeBackgroundColor}
						title='цвет фона'
					/>
					<Spacing size={50} />
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={changeContentWidth}
						title='ширина контентат'
					/>
					<Spacing size={207} />
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleOnClickButtonReset}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
