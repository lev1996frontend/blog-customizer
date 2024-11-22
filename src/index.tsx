import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [styleConfig, setStyleConfig] =
		useState<ArticleStateType>(defaultArticleState);

	const setConfig = (config: ArticleStateType) => {
		setStyleConfig(config);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleConfig.fontFamilyOption.value,
					'--font-size': styleConfig.fontSizeOption.value,
					'--font-color': styleConfig.fontColor.value,
					'--container-width': styleConfig.contentWidth.value,
					'--bg-color': styleConfig.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChangeStateArticle={setConfig} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
