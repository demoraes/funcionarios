/* eslint-disable camelcase */
/* eslint-disable no-inner-declarations */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  FormContainer,
  Input,
  FormLoading,
  Select,
} from '../../../components/Form';
import { HeaderForm } from '../../../components/ActionHeader';

import { SelectContainer } from './styles';

import api from '../../../services/api';
import history from '../../../services/history';

export default function FuncionarioForm({ match }) {
  const { id } = match.params;

  const [funcionarios, setFuncionarios] = useState({});
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (id) {
      async function loadFuncionariosDetails() {
        try {
          setLoading(true);
          const response = await api.get(`/funcionario/${id}`);

          setFuncionarios(response.data);

          setLoading(false);
        } catch (info) {
          toast.info(
            'Escolha os dados que deseja atualizar da encomenda escolhida'
          );
        }
      }

      loadFuncionariosDetails();
    }
  }, [id]);

  const statusRange = [
    { name: 'ATIVO', id: 1 },
    { name: 'INATIVO', id: 2 },
    { name: 'BLOQUEADO', id: 3 },
  ];

  const statusOptions = statusRange.map((status) => {
    const data = {
      value: status.id,
      label: status.name,
    };

    return data;
  });

  const handleChangeStatus = (selectedOption) => {
    const { value } = selectedOption;

    setSelectedStatus(value);
  };

  async function handleSubmit({
    data_cad,
    cargo,
    cpf,
    nome,
    uf_nasc,
    salario,
  }) {
    try {
      setButtonLoading(true);

      if (id) {
        const data = {
          data_cad,
          cargo,
          cpf,
          nome,
          uf_nasc,
          salario,
          status: selectedStatus,
        };
        await api.put(`/funcionarios/${id}`, data);

        toast.success('Funcionario atualizado com sucesso');
      }

      if (!id) {
        const data = {
          data_cad,
          cargo,
          cpf,
          nome,
          uf_nasc,
          salario,
          status: selectedStatus,
        };
        await api.post('/funcionarios', data);
        toast.success('Funcionario cadastrado com sucesso');
      }
      setButtonLoading(false);

      history.push('/');
    } catch (error) {
      toast.error('Algo deu errado ao salvar a encomenda');
    }
  }

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          onSubmit={handleSubmit}
          initialData={funcionarios}
          loading={buttonLoading}
        >
          <HeaderForm
            id={id}
            prevPage="/"
            title="Funcionários"
            loading={loading}
          />

          <section>
            <SelectContainer>
              <Select
                name="status"
                label="Distinatário"
                placeholder="Selecione um destinatário"
                options={statusOptions}
                defaultValue={{
                  value: selectedStatus.id,
                  label: selectedStatus.nome,
                }}
                onChange={handleChangeStatus}
              />
            </SelectContainer>
            <Input
              name="data_cad"
              label="Data de cadastro"
              placeholder="Ex: 2020-10-10T15:00:00-03:00"
            />
            <Input
              name="cargo"
              label="Cargo Atual"
              placeholder="Ex: Desenvolvedor"
            />
            <Input
              name="cpf"
              label="Numero do cpf"
              placeholder="Ex: 000.000.000-00"
            />
            <Input
              name="nome"
              label="Nome completo"
              placeholder="Ex: Gabriel Alves"
            />
            <Input
              name="uf_nasc"
              label="Estado "
              placeholder="Ex: Mato Grosso do Sul"
            />
            <Input
              name="salario"
              label="Salário atual"
              placeholder="Ex: 2500"
            />
          </section>
        </FormContainer>
      )}
    </>
  );
}

FuncionarioForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
