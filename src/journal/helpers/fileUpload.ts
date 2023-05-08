
export const fileUpload = async (file: File) => {

    if (!file) throw new Error("No tenemos ningún archivo a subir");


    const cloudinaryUrl = 'https://api.cloudinay.com/v1_1/dn7pzo01m/upload';
    const formData = new FormData();
    formData.append('upload_present', 'upload_present');
    formData.append('file', file);

    try {
        const respuesta = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData
        })

        console.log(respuesta);
        if (!respuesta.ok) throw new Error('NO se pudo subir la imagén');

        const cloudResponse = await respuesta.json();
        console.log(cloudResponse);
        return cloudResponse.secure_url;

    } catch (error) {
        throw new Error(error.message)
    }

}