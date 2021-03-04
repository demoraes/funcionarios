import React, { useState, useEffect } from 'react';
// import { format, parseISO } from 'date-fns';

import { toast } from 'react-toastify';
import { TableContainer, TableLoading } from '../../../components/Table';
import { Cadastro } from '../../../components/ActionHeader';
import {
  SearchCargoList,
  SearchCpf,
  SearchDataCad,
  SearchNome,
  SearchSalarioStart,
  SearchSalarioEnd,
  SearchStatus,
  SearchUfNasc,
} from '../../../components/Searchs';
import Header from '../../../components/Header';
import Action from './Actions';
import Pagination from '../../../components/Pagination';

import api from '../../../services/api';

import { Status, Searchs } from './styles';

function MainList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);
  const [totalFuncionarios, setTotalFuncionarios] = useState(null);
  const [searchDataCad, setSearchDataCad] = useState('');
  const [searchCargo, setSearchCargo] = useState('');
  const [searchCpf, setSearchCpf] = useState('');
  const [searchNome, setSearchNome] = useState('');
  const [searchSalarioStart, setSearchSalarioStart] = useState('');
  const [searchSalarioEnd, setSearchSalarioEnd] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchUfNasc, setSearchUfNasc] = useState('');
  const [loading, setLoading] = useState(false);

  const getFormattedStatus = (funcionario) => {
    let status = {};

    if (funcionario.status === 1) {
      status = { text: 'ATIVO', background: '#DFF0DF', color: '#2CA42B' };
      return status;
    }

    if (funcionario.status === 2) {
      status = { text: 'INATIVO', background: '#BAD2FF', color: '#4D85EE' };
      return status;
    }

    if (funcionario.status === 3) {
      status = { text: 'BLOQUEADO', background: '#FAB0B0', color: '#DE3B3B' };
      return status;
    }

    return status;
  };

  useEffect(() => {
    async function loadFuncionarios() {
      try {
        setLoading(true);

        const response = await api.get('funcionarios', {
          params: {
            page: currentPage,
            search_data_cad: searchDataCad,
            search_cargo: searchCargo,
            search_cpf: searchCpf,
            search_nome: searchNome,
            search_uf_nasc: searchUfNasc,
            search_salario_start: searchSalarioStart,
            search_salario_end: searchSalarioEnd,
            search_status: searchStatus,
          },
        });

        const data = response.data.funcionarios.map((funcionario) => {
          return {
            ...funcionario,
            formattedStatus: getFormattedStatus(funcionario),
          };
        });

        if (!response.data) {
          toast.warn('Nenhuma funcionario cadastrado');
        }

        setLoading(false);
        setPages(response.data.pages);
        setTotalFuncionarios(response.data.total);
        setFuncionarios(data);
      } catch (error) {
        toast.error(
          'Não foi possível carregar as informações dos funcionarios'
        );
      }
    }

    loadFuncionarios();
  }, [
    currentPage,
    searchDataCad,
    searchCargo,
    searchCpf,
    searchNome,
    searchSalarioStart,
    searchSalarioEnd,
    searchStatus,
    searchUfNasc,
  ]);

  function handlePage(page) {
    if (page === 0) {
      setCurrentPage(1);
    } else if (page > pages) {
      setCurrentPage(pages);
    } else {
      setCurrentPage(page);
    }
  }

  return (
    <>
      <Header />
      <Cadastro lowercaseTitle="Cpf" page="funcionario/new" visible />
      <Searchs>
        <SearchDataCad
          lowercaseTitle="DataCad"
          visible
          search={searchDataCad}
          setSearch={setSearchDataCad}
        />
        <SearchCargoList
          lowercaseTitle="Cargo"
          visible
          search={searchCargo}
          setSearch={setSearchCargo}
        />
        <SearchCpf
          lowercaseTitle="Cpf"
          visible
          search={searchCpf}
          setSearch={setSearchCpf}
        />
        <SearchNome
          lowercaseTitle="Nome"
          visible
          search={searchNome}
          setSearch={setSearchNome}
        />
        <SearchUfNasc
          lowercaseTitle="UfNasc"
          visible
          search={searchUfNasc}
          setSearch={setSearchUfNasc}
        />
        <SearchSalarioStart
          visible
          search={searchSalarioStart}
          setSearch={setSearchSalarioStart}
        />
        <SearchSalarioEnd
          visible
          search={searchSalarioEnd}
          setSearch={setSearchSalarioEnd}
        />
        <SearchStatus
          lowercaseTitle="Status"
          visible
          search={searchStatus}
          setSearch={setSearchStatus}
        />
      </Searchs>
      {loading ? (
        <TableLoading />
      ) : (
        <>
          <TableContainer>
            <thead>
              <tr>
                <th>DataCad</th>
                <th>Cargo</th>
                <th>Cpf</th>
                <th>Nome</th>
                <th>UfNasc</th>
                <th>Salario</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((funcionario) => (
                <tr key={funcionario.id}>
                  <td>{funcionario.data_cad}</td>
                  <td>{funcionario.cargo}</td>
                  <td>{funcionario.cpf}</td>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.uf_nasc}</td>
                  <td>{funcionario.salario}</td>
                  <td>
                    <Status status={funcionario.formattedStatus}>
                      <span value={funcionario.status}>
                        {funcionario.formattedStatus.text}
                      </span>
                    </Status>
                  </td>
                  <Action
                    page={`/funcionario/edit/${funcionario.id}`}
                    id={funcionario.id}
                    funcionarios={funcionarios}
                    setFuncionarios={setFuncionarios}
                  />
                </tr>
              ))}
            </tbody>
          </TableContainer>

          <Pagination
            currentPage={currentPage}
            pages={pages}
            totalDocs={totalFuncionarios}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}

export default MainList;
