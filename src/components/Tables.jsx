import {
  Tabs,
  Table,
  Button,
  Form,
  InputNumber,
  Input,
  Popconfirm,
  Typography,
} from "antd";
import "./tables.css";
import {
  EditOutlined,
  FileDoneOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const data = [
  {
    key: 1,
    name: "Astu Technologies Private Limited",
    phone: "+918934834069",
    email: "akshay.kota16@gmail.com",
    country: "India",
  },
  {
    key: 2,
    name: "XYZ Technologies Private Limited",
    phone: "+918934834069",
    email: "akshay93jaiswal@gmail.com",
    gstin: "ABCDEFGHIJKLMNO",
    pan: "ABCDEFGHIJ",
    country: "USA",
  },
  {
    key: 3,
    name: "Astu Technologies Private Limited",
    phone: "+918934834069",
    email: "akshay93jaiswal@gmail.com",
    gstin: "ABCDEFGHIJKLMNO",
    pan: "ABCDEFGHIJ",
    country: "India",
  },
  {
    key: 4,
    name: "Astu Technologies Private Limited",
    phone: "+918934834069",
    email: "akshay93jaiswal@gmail.com",
    gstin: "ABCDEFGHIJKLMNO",
    pan: "ABCDEFGHIJ",
    country: "India",
  },
];

const columns = [
  {
    title: "Client Name",
    dataIndex: "name",
    editable: true,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    editable: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    editable: true,
  },
  {
    title: "GSTIN/Tax ID",
    dataIndex: "gstin",
    editable: true,
  },
  {
    title: "PAN",
    dataIndex: "pan",
    editable: true,
  },
  {
    title: "Country",
    dataIndex: "country",
    editable: true,
  },
];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: ["gstin", "pan"].includes(dataIndex) ? false : true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ActiveClients = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      phone: "",
      email: "",
      gstin: "",
      pan: "",
      country: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...props.data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        props.setActiveClients(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        props.setActiveClients(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columnsWithActions = [
    ...columns,
    {
      title: "",
      render: (record) => {
        const editable = isEditing(record);
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.key)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <p style={{ cursor: "pointer", margin: 0 }}>Cancel</p>
                </Popconfirm>
              </span>
            ) : (
              <div className="table-action">
                <EditOutlined onClick={() => edit(record)} />
                Edit
              </div>
            )}
            <div className="table-action">
              <FileDoneOutlined />
              Create Invoice
            </div>
            <div className="table-action">
              <DeleteOutlined
                onClick={() => props.handleDelete([record.key])}
              />
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columnsWithActions.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "phone" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={() => props.handleDelete(selectedRowKeys)}
          disabled={!hasSelected}
        >
          Delete
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowSelection={rowSelection}
          columns={mergedColumns}
          dataSource={props.data}
          rowClassName="editable-row"
          pagination={false}
          size="middle"
        />
      </Form>
    </div>
  );
};

const DeletedClients = (props) => {
  return (
    <Table
      columns={columns}
      dataSource={props.data}
      pagination={false}
      size="middle"
    />
  );
};

const Tables = () => {
  const [activeClients, setActiveClients] = useState(data);
  const [deletedClients, setDeletedClients] = useState([]);

  const handleDelete = (selectedRowKeys) => {
    const updatedActiveClients = activeClients.filter(
      (client) => !selectedRowKeys.includes(client.key)
    );
    const deletedClientsToAdd = activeClients.filter((client) =>
      selectedRowKeys.includes(client.key)
    );
    const updatedDeletedClients = [...deletedClients, ...deletedClientsToAdd];
    setActiveClients(updatedActiveClients);
    setDeletedClients(updatedDeletedClients);
  };

  const items = [
    {
      key: "1",
      label: `Active Clients`,
      children: (
        <ActiveClients
          data={activeClients}
          handleDelete={handleDelete}
          setActiveClients={setActiveClients}
        />
      ),
    },
    {
      key: "2",
      label: `Deleted Clients`,
      children: <DeletedClients data={deletedClients} />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};
export default Tables;
