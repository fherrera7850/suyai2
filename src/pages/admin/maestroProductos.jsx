import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/Cookie';
import { formatSubtotal } from "../../utils/Numbers";

export const MaestroProductos = () => {
    const [productos, setProductos] = useState([]);
    const [visibleAddProduct, setVisibleAddProduct] = useState(false);

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stock, setStock] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');

    useEffect(() => {
        

        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/producto/getProductosAdmin`);
            console.log("🚀 ~ fetchProductos ~ response.data:", response.data)
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los pedidos:', error);
        }
    };

    // Función para agregar un nuevo producto (no implementada aquí)
    const addProduct = async () => {

        if (nombre === '' || descripcion === '' || stock === '' || precio === '' || imagen === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        // Implementa la lógica para agregar un nuevo producto
        const url = `${process.env.REACT_APP_API_URL}/producto/addProducto`
        console.log("🚀 ~ addProduct ~ url:", url)

        const objProducto = { 
            nombreProducto: nombre, 
            descripcionProducto: descripcion, 
            precio,
            stock,
            imagen: 'assets/products/' + imagen,
            activo: 1
        }
        console.log("🚀 ~ addProduct ~ objProducto:", JSON.stringify(objProducto))

        await axios.post(url, objProducto )
        .then(response => {
            if (response.status === 200) {
                setVisibleAddProduct(false);
                setNombre('');
                setDescripcion('');
                setStock('');
                setPrecio('');
                setImagen('');
                alert("Se agrego el nuevo producto");
                fetchProductos();
            }
            else {
                alert("Se produjo un error al agregar el nuevo producto. Error: " + response.status);
            }
        })
        .catch(error => {
            console.error('Error al realizar la petición:', error);
            alert("Error desconocido: " + error);
        })
    };

    // Función para editar un producto (no implementada aquí)
    const editProduct = (id) => {
        // Implementa la lógica para editar un producto
    };

    // Función para eliminar un producto
    const deleteProduct = (id) => {
        //setProducts(products.filter(product => product.idProducto !== id));
    };

    // Estilos
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        table: {
            borderCollapse: 'collapse',
            width: '80%',
            margin: '20px auto',
        },
        tableHeader: {
            backgroundColor: '#f2f2f2',
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
        },
        tableCell: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
        },
        button: {
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '14px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '4px',
        },
        addButton: {
            backgroundColor: '#008CBA',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            marginTop: '20px',
            cursor: 'pointer',
            borderRadius: '4px'
        },
        buttonCancelar: {
            backgroundColor: 'red',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '4px'
        },
        formContainer: {
            width: '50%',
            margin: '20px auto',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        input: {
            width: '100%',
            margin: '5px 0',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
    };

    const formAddProduct = () => {
        return (
            <>
                {/* Formulario para agregar un nuevo producto */}
                <div style={styles.formContainer}>
                    <h3>Agregar Nuevo Producto</h3>
                    <div style={styles.form}>
                        <input style={styles.input} type="text" name="nombreProducto" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input style={styles.input} type="text" name="descripcionProducto" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        <input style={styles.input} type="text" name="precio" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                        <input style={styles.input} type="text" name="stock" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                        <input style={styles.input} type="text" name="imagen" placeholder="Imagen (Ej: imagenProducto1.png)" value={imagen} onChange={(e) => setImagen(e.target.value)}  />
                        <button style={styles.addButton} type="button" onClick={addProduct}>Agregar Producto</button>
                        <button style={styles.buttonCancelar} type="button" onClick={() => setVisibleAddProduct(false)}>Cancelar</button>
                    </div>
                </div>
            </>
        )
    }

    if(getCookie("rol") !== 'a'){
        alert("Cuenta no autorizada. Inicie sesión o regrese como administrador")
        window.location.href = '/'
    }

    return (
        <>
            {visibleAddProduct ? //Si presiono el boton de agregar producto, se agrega el form para crear el producto
                formAddProduct() :
                <div class="d-flex justify-content-end" style={{ width: '80%', margin: '20px auto' }}>
                    <button style={styles.addButton} onClick={() => setVisibleAddProduct(true)}>Agregar Producto</button>
                </div>}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>ID</th>
                        <th style={styles.tableHeader}>Nombre</th>
                        <th style={styles.tableHeader}>Descripción</th>
                        <th style={styles.tableHeader}>Precio</th>
                        <th style={styles.tableHeader}>Stock</th>
                        <th style={styles.tableHeader}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(product => (
                        <tr key={product.idProducto} style={{ backgroundColor: product.idProducto % 2 === 0 ? '#f2f2f2' : 'white' }}>
                            <td style={styles.tableCell}>{product.idProducto}</td>
                            <td style={styles.tableCell}>{product.nombreProducto}</td>
                            <td style={styles.tableCell}>{product.descripcionProducto}</td>
                            <td style={styles.tableCell}>{"$" + formatSubtotal(product.precio) }</td>
                            <td style={styles.tableCell}>{product.stock}</td>
                            <td style={styles.tableCell}>
                                <button style={styles.button} onClick={() => editProduct(product.idProducto)}>Editar</button>
                                <button style={styles.button} onClick={() => deleteProduct(product.idProducto)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    );


};
