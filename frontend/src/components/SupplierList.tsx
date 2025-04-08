import React from 'react';
import { List, Spin, Button, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Supplier } from '../types/models';

interface Props {
  suppliers: Supplier[];
  loading: boolean;
  onDelete: (id: number) => void;
  onEdit: (supplier: Supplier) => void;
}

const SupplierList: React.FC<Props> = ({ suppliers, loading, onDelete, onEdit }) => {
  return (
    <>
      <h3>Lieferantenliste</h3>
      {loading ? (
        <Spin />
      ) : (
        <List
          bordered
          dataSource={suppliers}
          renderItem={(supplier) => (
            <List.Item
              actions={[
                // Link zur Bewertungsseite
                <Button key="view" icon={<EyeOutlined />} type="link">
                  <Link to={`/suppliers/${supplier.id}/evaluations`}>Bewertungen</Link>
                </Button>,

                // Edit-Button ruft übergeordnete Handler auf
                <Button
                  key="edit"
                  icon={<EditOutlined />}
                  type="link"
                  onClick={() => onEdit(supplier)}
                >
                  Bearbeiten
                </Button>,

                // Bestätigungsdialog für das Löschen
                <Popconfirm
                  key="delete"
                  title="Lieferant wirklich löschen?"
                  onConfirm={() => onDelete(supplier.id)}
                  okText="Ja"
                  cancelText="Nein"
                >
                  <Button icon={<DeleteOutlined />} type="link" danger>
                    Löschen
                  </Button>
                </Popconfirm>,
              ]}
            >
              {supplier.id} – {supplier.name}
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default SupplierList;
