"use client";

import styles from "./addRecipe.module.css";
import Image from "next/image";
import { useState, ChangeEvent, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IngredientFromDB {
  _id: string;
  name: string;
  desc?: string;
  img?: string;
}

interface CategoryFromDB {
  _id: string;
  name: string;
}

interface SelectedIngredient {
  ingredient: string;
  name: string;
  ingredientAmount: string;
}

const recipeValidationSchema = Yup.object({
  title: Yup.string().max(64, "Max 64 characters").required("Required"),
  description: Yup.string().max(200, "Max 200 characters").required("Required"),
  time: Yup.number().min(1).max(360).required("Required"),
  cals: Yup.number().min(1).max(10000).notRequired(),
  category: Yup.string().required("Required"),
  thumb: Yup.mixed().nullable(),
  instructions: Yup.string()
    .max(1200, "Max 1200 characters")
    .required("Required"),
});

export default function AddRecipePage() {
  const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [categoriesList, setCategoriesList] = useState<CategoryFromDB[]>([]);
  const [ingredientsList, setIngredientsList] = useState<IngredientFromDB[]>(
    [],
  );

  const [currentIngredientId, setCurrentIngredientId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [recipeIngredients, setRecipeIngredients] = useState<
    SelectedIngredient[]
  >([]);
  const [ingredientsError, setIngredientsError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      time: "",
      cals: "",
      category: "",
      instructions: "",
      thumb: null,
    },
    validationSchema: recipeValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (recipeIngredients.length === 0) {
        setIngredientsError(
          "Please add at least one ingredient to your recipe",
        );
        return;
      }
      setIngredientsError(null);

      try {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("category", values.category);
        formData.append("instructions", values.instructions);
        formData.append("description", values.description);
        formData.append("time", values.time);
        formData.append("cals", values.cals || "0");

        const ingredientsForBackend = recipeIngredients.map((item) => ({
          id: item.ingredient,
          measure: item.ingredientAmount.trim(),
        }));
        formData.append("ingredients", JSON.stringify(ingredientsForBackend));

        if (photoFile) {
          formData.append("thumb", photoFile);
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
            credentials: "include",
          },
        );

        if (response.ok) {
          const resultData = await response.json();
          toast.success("Recipe successfully published!", {
            duration: 4000,
            style: {
              fontFamily: "inherit",
              borderRadius: "8px",
              background: "#d7d5d5",
              color: "#1cbd34",
            },
          });

          resetForm();
          setRecipeIngredients([]);
          setPhotoPreview(null);
          setPhotoFile(null);

          const recipeId = resultData._id || resultData.id;
          if (recipeId) {
            router.push(`/recipes/${recipeId}`);
          }
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to publish recipe");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, ingRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients`),
        ]);

        if (catRes.ok) {
          const catData = await catRes.json();
          setCategoriesList(catData);
        }

        if (ingRes.ok) {
          const ingData = await ingRes.json();
          setIngredientsList(ingData);
        }
      } catch {}
    };

    fetchData();
  }, []);

  // Логіка кнопки "Add new Ingredient"
  const handleAddIngredient = () => {
    if (!currentIngredientId || !amount.trim()) {
      alert("Please select an ingredient and enter amount.");
      return;
    }

    const trimmedAmount = amount.trim();
    if (trimmedAmount.length < 2 || trimmedAmount.length > 16) {
      alert(
        "Ingredient amount must be between 2 and 16 characters (e.g., '100g').",
      );
      return;
    }
    if (
      recipeIngredients.some((item) => item.ingredient === currentIngredientId)
    ) {
      alert("This ingredient is already added!");
      return;
    }

    const found = ingredientsList.find(
      (ing) => ing._id === currentIngredientId,
    );
    if (found) {
      setRecipeIngredients([
        ...recipeIngredients,
        {
          ingredient: found._id,
          name: found.name,
          ingredientAmount: trimmedAmount,
        },
      ]);

      setCurrentIngredientId("");
      setAmount("");
      setIngredientsError(null);
    }
  };

  const handleRemoveIngredient = (idToRemove: string) => {
    setRecipeIngredients(
      recipeIngredients.filter((item) => item.ingredient !== idToRemove),
    );
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2Mb.");
        return;
      }

      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }

      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleRemovePhoto = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setPhotoPreview(null);
    setPhotoFile(null);
  };

  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;

    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <main className="container">
      <h1 className={styles.mainTitle}>Add Recipe</h1>
      <form onSubmit={formik.handleSubmit} className={styles.mainForm}>
        {/* ЛІВА ЧАСТИНА МАКEТА */}
        <div className={styles.leftColumn}>
          {/* БЛОК 1: General Information + Category */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>General Information</h2>
            {/* Title */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Recipe Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter the name of your recipe"
                className={`${styles.input} ${formik.touched.title && formik.errors.title ? styles.inputError : ""}`}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && (
                <p className={styles.errorText}>{formik.errors.title}</p>
              )}
            </div>
            {/* Description */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Recipe Description</label>
              <textarea
                name="description"
                placeholder="Enter a brief description of your recipe"
                className={`${styles.textarea} ${formik.touched.description && formik.errors.description ? styles.inputError : ""}`}
                value={formik.values.description}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleInputResize(e);
                }}
                onBlur={formik.handleBlur}
                rows={5}
              />
              {formik.touched.description && formik.errors.description && (
                <p className={styles.errorText}>{formik.errors.description}</p>
              )}
            </div>
            {/* Cooking Time */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Cooking time in minutes</label>
              <input
                name="time"
                type="text"
                placeholder="10"
                className={`${styles.input} ${formik.touched.time && formik.errors.time ? styles.inputError : ""}`}
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.time && formik.errors.time && (
                <p className={styles.errorText}>{formik.errors.time}</p>
              )}
            </div>
            <div className={styles.rowGrid}>
              {/* Calories */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Calories</label>
                <input
                  type="text"
                  name="cals"
                  placeholder="150"
                  className={`${styles.input} ${formik.touched.cals && formik.errors.cals ? styles.inputError : ""}`}
                  value={formik.values.cals}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.cals && formik.errors.cals && (
                  <p className={styles.errorText}>{formik.errors.cals}</p>
                )}
              </div>
              {/* Category Select */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Category</label>
                <select
                  name="category"
                  className={`${styles.select} 
                  ${!formik.values.category ? styles.selectPlaceholder : ""}
                  ${formik.touched.category && formik.errors.category ? styles.inputError : ""}`}
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled hidden>
                    Soup
                  </option>
                  {categoriesList.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <p className={styles.errorText}>{formik.errors.category}</p>
                )}
              </div>
            </div>
          </section>

          {/* БЛОК 2: Ingredients */}
          <section
            className={`${styles.formSection} ${styles.ingredientsSection}`}
          >
            <h2 className={styles.sectionTitle}>Ingredients</h2>
            <div className={styles.ingredientscontrolsBlock}>
              <div className={styles.inputsRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Name</label>
                  <select
                    name="ingredient"
                    className={`${styles.select} ${!currentIngredientId ? styles.selectPlaceholder : ""}`}
                    value={currentIngredientId || ""}
                    onChange={(e) => setCurrentIngredientId(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Broccoli
                    </option>
                    {ingredientsList.map((ingredient) => (
                      <option key={ingredient._id} value={ingredient._id}>
                        {ingredient.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Amount</label>
                  <input
                    type="text"
                    placeholder="100g"
                    className={styles.input}
                    value={amount || ""}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.btnRow}>
                {ingredientsError && (
                  <p className={styles.errorText}>{ingredientsError}</p>
                )}
                <button
                  type="button"
                  className={styles.addIngredientBtn}
                  onClick={handleAddIngredient}
                >
                  Add new Ingredient
                </button>
              </div>
            </div>
            <div className={styles.listSection}>
              <div className={styles.listHeader}>
                <span className={styles.headerName}>Name:</span>
                <span className={styles.headerAmount}>Amount:</span>
                <span></span>
              </div>
              {recipeIngredients.length > 0 && (
                <ul className={styles.ingredientsList}>
                  {recipeIngredients.map((item) => (
                    <li key={item.ingredient} className={styles.listItem}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemAmount}>
                        {item.ingredientAmount}
                      </span>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => handleRemoveIngredient(item.ingredient)}
                      >
                        <Image
                          src="/removeIngredient.svg"
                          alt="Remove Ingredient"
                          className={styles.removeIngredientIcon}
                          width={24}
                          height={24}
                          unoptimized
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* БЛОК 3: Instructions */}
          <section
            className={`${styles.formSection} ${styles.instructionsSection}`}
          >
            <h2 className={styles.sectionTitle}>Instructions</h2>
            <div className={styles.inputGroup}>
              <textarea
                name="instructions"
                placeholder="Enter a text"
                className={`${styles.textarea} ${formik.touched.instructions && formik.errors.instructions ? styles.inputError : ""}`}
                value={formik.values.instructions}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleInputResize(e);
                }}
                onBlur={formik.handleBlur}
                rows={5}
              />
              {formik.touched.instructions && formik.errors.instructions && (
                <p className={styles.errorText}>{formik.errors.instructions}</p>
              )}
            </div>
          </section>
          <button
            type="submit"
            className={styles.publishBtn}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Publishing..." : "Publish Recipe"}
          </button>
        </div>

        {/* ПРАВА ЧАСТИНА МАКЕТА (Upload Photo) */}
        <section className={`${styles.formSection} ${styles.rightColumn}`}>
          <h2 className={styles.sectionTitle}>Upload Photo</h2>
          <div className={styles.dropzone}>
            <input
              type="file"
              accept="image/*"
              id="photo-upload"
              className={styles.hiddenInput}
              onChange={handlePhotoChange}
            />
            {photoPreview ? (
              <div className={styles.previewContainer}>
                <button
                  type="button"
                  className={styles.deletePhotoBtn}
                  onClick={handleRemovePhoto}
                >
                  <Image
                    src="/deletePhoto.svg"
                    alt="Delete Photo"
                    className={styles.deletePhotoIcon}
                    width={32}
                    height={32}
                    unoptimized
                  />
                </button>
                <label htmlFor="photo-upload" className={styles.previewLabel}>
                  <Image
                    src={photoPreview}
                    alt="Preview"
                    className={styles.previewImage}
                    fill
                    sizes="391px"
                    unoptimized
                  />
                </label>
              </div>
            ) : (
              <label htmlFor="photo-upload" className={styles.dropzoneLabel}>
                {/* Мобілка + Планшет (82x82) */}
                <Image
                  src="/camera-mobile.svg"
                  alt="Camera Mobile"
                  width={82}
                  height={82}
                  className={styles.cameraMobile}
                  priority
                />
                {/* Десктоп (162x136) */}
                <Image
                  src="/camera.svg"
                  alt="Camera Desktop"
                  className={styles.cameraDesktop}
                  width={162}
                  height={136}
                  priority
                />
              </label>
            )}
          </div>
        </section>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
