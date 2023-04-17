import { useEffect } from 'react';
import FormText from './pages/form-text';
import Connect from './pages/connect';
import FormMedia from './form-media';
import FormCode from './pages/form-code';
import GetStarted from './pages/get-started';
import Loader from './components/loader';
import useUserInfo from './hooks/use-user-info';
import WizardDialog from './components/wizard-dialog';
import PromptDialog from './components/prompt-dialog';
import UpgradeChip from './components/upgrade-chip';

const PageContent = (
	{
		type,
		controlType,
		onClose,
		getControlValue,
		setControlValue,
		additionalOptions,
	} ) => {
	const { isLoading, isConnected, isGetStarted, connectUrl, fetchData, hasSubscription, credits } = useUserInfo();

	useEffect( () => {
		fetchData();
	}, [] );

	if ( isLoading ) {
		return (
			<PromptDialog onClose={ onClose }>
				<Loader />
			</PromptDialog>
		);
	}

	if ( ! isConnected ) {
		return (
			<WizardDialog onClose={ onClose }>
				<Connect connectUrl={ connectUrl } onSuccess={ fetchData } />
			</WizardDialog>
		);
	}

	if ( ! isGetStarted ) {
		return (
			<WizardDialog onClose={ onClose }>
				<GetStarted onSuccess={ fetchData } />
			</WizardDialog>
		);
	}

	if ( 'media' === type ) {
		return (
			<PromptDialog onClose={ onClose } headerAction={ ! hasSubscription && <UpgradeChip /> }>
				<FormMedia onClose={ onClose } setControlValue={ setControlValue } />
			</PromptDialog>
		);
	}

	if ( 'code' === type ) {
		return (
			<PromptDialog onClose={ onClose } headerAction={ ! hasSubscription && <UpgradeChip /> }>
				<FormCode
					onClose={ onClose }
					getControlValue={ getControlValue }
					setControlValue={ setControlValue }
					additionalOptions={ additionalOptions }
					credits={ credits }
				/>
			</PromptDialog>
		);
	}

	return (
		<PromptDialog onClose={ onClose } headerAction={ ! hasSubscription && <UpgradeChip /> }>
			<FormText
				type={ type }
				controlType={ controlType }
				onClose={ onClose }
				getControlValue={ getControlValue }
				setControlValue={ setControlValue }
				additionalOptions={ additionalOptions }
				credits={ credits }
			/>
		</PromptDialog>
	);
};

export default PageContent;
