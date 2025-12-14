"use client"

import {
    Field,
    FieldGroup,
    FieldSet,
} from "@/components/ui/field"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/form";
import { pergunta_creation_schema } from "../pergutasTypo";

export default function inputQuestoes() {


    const mutation = api.pergunta.create.useMutation()

    //Função que realiza a mutação para criar uma pergunta quando o botão submit é clicado
    function onSubmit(values: z.infer<typeof pergunta_creation_schema>) {

        mutation.mutate({
            pergunta: values.pergunta,
            linguagem: values.linguagem,
            alternativa1: values.alternativa1,
            alternativa2: values.alternativa2,
            alternativa3: values.alternativa3,
            alternativa4: values.alternativa4,
            alt_correta: values.alt_correta,
            dificuldade: values.dificuldade,
        })
        form.reset()

    }

    function onBadSubmit(values: z.infer<typeof pergunta_creation_schema>) {
        alert("Parametros invalidos")
    }

    //Formulario com valores default invalidos para evitar erros
    const form = useForm<z.infer<typeof pergunta_creation_schema>>({
        mode: "onChange",
        defaultValues: {
            pergunta: "",
            linguagem: "",
            alternativa1: "",
            alternativa2: "",
            alternativa3: "",
            alternativa4: "",
            alt_correta: 1,
            dificuldade: 1
        },
        resolver: zodResolver(pergunta_creation_schema)

    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit, onBadSubmit)} >
            <FieldSet className="flex px-10 py-5">
                <div className="flex flex-row space-x-2">
                    <Field className="w-1/2">
                        <Input id="pergunta" type="text" placeholder="Pergunta" {...form.register("pergunta", { required: true })} />
                    </Field>
                    <FieldGroup className="flex flex-row min-w-fit">
                        <Field><Input id="linguagem" type="text" placeholder="Linguagem" {...form.register("linguagem", { required: true })} /></Field>
                        <Field><Input id="alternativa1" type="text" placeholder="Opção 1" {...form.register("alternativa1", { required: true })} /></Field>
                        <Field><Input id="alternativa2" type="text" placeholder="Opção 2" {...form.register("alternativa2", { required: true })} /></Field>
                        <Field><Input id="alternativa3" type="text" placeholder="Opção 3" {...form.register("alternativa3", { required: true })} /></Field>
                        <Field><Input id="alternativa4" type="text" placeholder="Opção 4" {...form.register("alternativa4", { required: true })} /></Field>
                        <Field><Input id="dificuldade" type="number" placeholder="Dificuldade" {...form.register("dificuldade", { required: true, valueAsNumber: true })} /></Field>
                    </FieldGroup>
                </div>
                <div className="flex space-x-2 w-1/4">
                    <FormField
                        control={form.control}
                        name="alt_correta"
                        render={({ field }) => {
                            return (
                                <Select
                                    onValueChange={(value) => field.onChange(Number(value))}
                                    value={field.value !== undefined ? String(field.value) : ''}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Opção correta" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Opção 1</SelectItem>
                                        <SelectItem value="2">Opção 2</SelectItem>
                                        <SelectItem value="3">Opção 3</SelectItem>
                                        <SelectItem value="4">Opção 4</SelectItem>
                                    </SelectContent>

                                </Select>
                            );
                        }} />

                    <Field className="flex flex-row max-w-1/10">
                        <Button type="submit" className="min-w-fit">Adicionar</Button>
                        <Button type="button" className="min-w-fit" onClick={() => form.reset()}>Cancelar</Button>
                    </Field>
                </div>
            </FieldSet>
        </form>
    )
}