'use client'
import React, { useState, useEffect } from 'react';
import styles from '@/app/[lng]/(overview)/perfil/perfil.module.css';
import { IconCamera } from '@/assets/icons';
import { Controller, useForm } from 'react-hook-form';
import MaskedInput from '../MaskedInput/MaskedInput';
import { getDictionary } from '@/dictionaries';
import { useParams } from 'next/navigation';


export interface propPersonal {
    firstName?: any,
    setFirstName?: any,
    email?: any,
    setEmail?: any,
    cpf?: any,
    setCpf?: any,
    phone?: any,
    setPhone?: any,
    profileImg?: any,
    imageHandler?: any,
    update?: any
  }

const PersonalData: React.FC<propPersonal> = ({
    firstName,
    setFirstName,
    email,
    setEmail,
    cpf,
    setCpf,
    phone,
    setPhone,
    profileImg,
    imageHandler,
    update
  }: propPersonal)=> {

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();
  
    useEffect(() => {
      const fetchDictionary = async () => {
        const dictionary = await getDictionary(
          searchParams.lng as 'pt' | 'en' | 'es',
          'profile',
        );
        setDic(dictionary);
      };
  
      fetchDictionary();
    }, [searchParams.lng]);

    const [edit, setEdit] = useState<any>([]);

    useEffect(() => {
      let aux: any = [];
      for (let i = 0; i < 4; i++) {
        aux.push(false)
      }
      setEdit(aux);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function HandleEdit(index: any) {
      let auxEdit: any = [];
  
      for (let i = 0; i < edit.length; i++) {
        if (i === index) {
          auxEdit.push(!edit[i]);
        } else {
          auxEdit.push(edit[i]);
        }
      }
  
      setEdit(auxEdit);
    }

    const {
      control,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
    } = useForm();

    return(
        <div className={`col-span-9`}>
            <div className={`border-b grid grid-cols-12 gap-2`}>
              <div className="col-span-9 md:col-span-11">
                <h1 className={`${styles.title}`}>{dic?.personalData}</h1>
                <h2 className="mb-4">
                  {dic?.updateInfo}
                </h2>
              </div>
              <div className={`col-span-3 md:col-span-1 ${styles.picture_conteiner} flex justify-end`}>
              
                <label
                  className={`${styles.pic} flex justify-center items-end`}
                  style={{ backgroundImage: `url(${profileImg})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer' }}
                >
                  <div className={styles.retangle}>
                    {/* <FontAwesomeIcon
                      icon={["fad", "camera-alt"]}
                      color="white"
                    /> */}
                    {IconCamera("white", "16", "14")}
                  </div>
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    name="image-upload"
                    id="input"
                    onChange={imageHandler}
                  /* onClick={update} */
                  />
                </label>
              
              </div>
            </div>
            <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">
              <div className="col-span-2 leading-4 font-medium">
                {dic?.name}
              </div>
              <div className="col-span-8 leading-4">
              {
                  edit[0] === false
                    ?
                    <p className="mb-0">
                      {firstName}
                    </p>
                    :
              <Controller
                  control={control}
                  name="firstName"
                  rules={{
                    required: { value: true, message: `nome` },
                  }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      aria-invalid={errors?.compName ? 'true' : ''}
                      variant="standard"
                      margin="normal"
                      placeholder={dic?.fillInName}
                      autoComplete="off"
                      className={styles.form_control}
                      onInput={(e:any) => setFirstName(e.target.value)}
                      required
                    />
                  )}
                />}
              </div>
              <div className="col-span-2 text-right leading-4">
              {
                  edit[0] === false
                    ?                  
                  
              <button onClick={() => HandleEdit(0)} className="font-normal text-primary">
                {dic?.edit}
              </button>
              :
              <div className="flex justify-end gap-4">
                <button onClick={() => HandleEdit(0)} className="font-normal text-primary">
                
                {dic?.cancel}
              </button>
              <button onClick={() => update()} className="font-normal text-primary">
              {dic?.save}
              </button>
                </div>}
              </div>
            </div>
            <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">
              <div className="col-span-2 leading-4 font-medium">CPF</div>
              <div className="col-span-8 leading-4">
              {
                  edit[1] === false
                    ?
                    <p className="mb-0">
                      {cpf}
                    </p>
                    :
              <Controller
                  control={control}
                  name="cpf"
                  rules={{
                    required: { value: true, message: `CPF` },
                  }}
                  render={({ field }: any) => (
                    <MaskedInput placeholder="___.___.___-__" className={styles.form_control} field={field} />
                  )}
                />}
                </div>
              <div className="col-span-2 text-right leading-4">
              {/* <button className="font-normal text-primary">Editar</button> */}
              </div>
            </div>
            <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">
              <div className="col-span-2 leading-4 font-medium">E-mail</div>
              <div className="col-span-8 leading-4 text-slate-400">
                <div className="mb-4">
                {
                  edit[2] === false
                    ?
                    <p className="mb-0">
                      {email}
                    </p>
                    :
                  <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: { value: true, message: `nome` },
                  }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      aria-invalid={errors?.compName ? 'true' : ''}
                      variant="standard"
                      margin="normal"
                      type='email'
                      placeholder={dic?.fillInEmail}
                      autoComplete="off"
                      className={styles.form_control}
                      required
                    />
                  )}
                />}
                </div>
                <p>
                {dic?.thisEmail}
                </p>
              </div>
              <div className="col-span-2 text-right leading-4">
              {/* <button className="font-normal text-primary">Editar</button> */}
              </div>
            </div>
            <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">
              <div className="col-span-2 leading-4 font-medium">
              {dic?.phone}
              </div>
              <div className="col-span-8 leading-4">
              {
                  edit[3] === false && phone !== null
                    ?
                    <p className="mb-0">
                      {phone}
                    </p>
                    :
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: { value: true, message: `nome` },
                  }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      aria-invalid={errors?.compName ? 'true' : ''}
                      variant="standard"
                      margin="normal"
                      type='tel'
                      placeholder={dic?.fillInPhone}
                      autoComplete="off"
                      className={styles.form_control}
                      required
                    />
                  )}
                />}
                </div>
              
              <div className="col-span-2 text-right leading-4">
              {
                  edit[3] === false
                    ?                  
                  
              <button onClick={() => HandleEdit(3)} className="font-normal text-primary">
                {dic?.edit}
              </button>
              :
              <div className="flex justify-end gap-4">
                <button onClick={() => HandleEdit(3)} className="font-normal text-primary">
                {dic?.cancel}
              </button>
              <button onClick={() => update()} className="font-normal text-primary">
              {dic?.save}
              </button>
                </div>}
              </div>
              
            </div>
          </div>
    )
}


export default PersonalData;