import React, { useEffect, useState } from 'react';
import Paper from './container/Paper';
import Button from './form/Button';
import InputField from './form/InputField';
import Title from './typo/Title';
import { useSelector, useDispatch } from 'react-redux'
import { apiGetContainers, apiMountContainer, apiUnmountContainer } from '../api/request';
import { updateList, update } from '../reducer/containerReducer';
import { useHistory } from "react-router-dom";
import { path } from '../router/routes';
import Modal from '../components/container/Modal'
import { STATUS } from '../config/api';
import {useAuth} from "../auth/hooks/useAuth";
import {formatBytes} from "../utils/utils";
import LoaderBar from "./LoaderBar";
import {subscribeForMountProcess} from "../mercure/subscribers";
import {
    DOWNLOAD_END,
    DOWNLOAD_INIT,
    DOWNLOAD_PROGRESS,
    DECRYPT_END,
    DECRYPT_INIT, DECRYPT_FAILED
} from "../mercure/steps";

const ContainerList = () => {
    const [modal, setModal] = useState(false);
    const [inProcess, setInProcess] = useState(false);
    const [statusMountProcess, setStatusMountProcess] = useState(<p></p>);
    const [currentContainer, setCurrentContainer] = useState(null);
    const [decryptFailedMessage, setDecryptFailedMessage] = useState(null);
    const [password, setPassword] = useState('');
    const containers = useSelector((state) => state.container.value);
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useAuth();

    useEffect(() => {
        async function fetchData() {
            if (containers === null) {
                const containers = await apiGetContainers(auth.user);
                dispatch(updateList(containers));
            }
        }
        fetchData();
    });

    function handleClick(container) {
        if (container.isMount) {
            redirectToContainer(container);
        } else {
            openModalMountContainer(container);
        }
    }

    function redirectToContainer(container) {
        history.push(path('container', {keysecure: container.keysecure}))
    }

    function openModalMountContainer(container) {
        setModal(true);
        setCurrentContainer(container);
    }

    function closeModalMountContainer() {
        setModal(false);
        setCurrentContainer(null);
        setPassword("");
    }

    async function unmountContainer(event, container) {
        event.preventDefault();
        event.stopPropagation();
        let res = await apiUnmountContainer(container.id);
        if (res.status === STATUS.SUCCESS) {
            let newContainer = {...container};
            newContainer.isMount = false;
            dispatch(update(newContainer));
        }
    }

    function mountContainer(event, container) {
        event.preventDefault();
        event.stopPropagation();
        openModalMountContainer(container)
    }

    async function mountAction() {
        let res = await apiMountContainer(currentContainer.keysecure, password, auth.user);
        if (res.status === STATUS.SUCCESS) {
            manageMountProcess(res.topic);
            closeModalMountContainer();
            setInProcess(true);
        }
    }

    function manageMountProcess(topic) {
        const eventSource = subscribeForMountProcess(topic);
        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            console.log(data);
            switch (data.step) {
                case DOWNLOAD_INIT:
                    setStatusMountProcess(<p>Download start</p>);
                    break;
                case DOWNLOAD_PROGRESS:
                    setStatusMountProcess(<p>Downloading : <span className="status">{data.progress} %</span></p>);
                    break;
                case DOWNLOAD_END:
                    setStatusMountProcess(<p>Download end</p>);
                    break;
                case DECRYPT_INIT:
                    setStatusMountProcess(<p>Decryption start</p>);
                    break;
                case DECRYPT_END:
                    setStatusMountProcess(<p></p>);
                    eventSource.close();
                    setInProcess(false);
                    let newContainer = {...currentContainer};
                    newContainer.isMount = true;
                    dispatch(update(newContainer));
                    setDecryptFailedMessage(null);
                    break;
                case DECRYPT_FAILED:
                    setStatusMountProcess(<p></p>);
                    eventSource.close();
                    setInProcess(false);
                    setDecryptFailedMessage("Fail to decrypt container !");
                    break;
            }
        }
    }

    return (
        <div>
            <Title text="Containers" />

            {modal && currentContainer ? (
                <Modal isOpen={modal} close={closeModalMountContainer}>
                    <Title subTitle={true} text={`Password for container : ${currentContainer.name}`} />
                    <div className="form">
                        <InputField
                            label="Password"
                            placeholder="•••••••••••••••••••"
                            type="password"
                            isPassword={true}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <div className="form__action">
                            <Button text="Mount" onClick={mountAction} />
                        </div>
                    </div>
                </Modal>
            ) : null}

            {containers !== null ? (
                <ul>
                    {containers.length !== 0 ? containers.map(container => (
                        <li className={inProcess ? 'in-process' : ''} key={container.keysecure} onClick={() => handleClick(container)}>
                            <Paper>
                                <div className="li__header">
                                    <div>
                                        <p className="li__title">{container.name}</p>
                                        <p>Size : <strong>{formatBytes(container.size)}</strong></p>
                                    </div>
                                    <div className="action">
                                        {inProcess ? (
                                            <Button text="Processing" variant="disabled" onClick={(event) => unmountContainer(event, container)} />
                                        ) : container.isMount ? (
                                                <Button text="Unmount" variant="error" onClick={(event) => unmountContainer(event, container)} />
                                            ) : (
                                                <Button text="Mount" onClick={(event) => mountContainer(event, container)} />
                                            )
                                        }
                                    </div>
                                </div>
                                {inProcess ? (
                                    <>
                                        <LoaderBar/>
                                        <div className="process">
                                            {statusMountProcess}
                                        </div>
                                    </>
                                ) : (
                                    <div className="li__footer">
                                        <p>Mount directory : <br /> {container.mountDirectory}/</p>
                                        {decryptFailedMessage && <p className="error">{decryptFailedMessage}</p>}
                                    </div>
                                )}
                            </Paper>
                        </li>
                    )) : (
                        <p>Aucun container</p>
                    )}
                </ul>
            ) : null}
        </div>
    );
}

export default ContainerList;
